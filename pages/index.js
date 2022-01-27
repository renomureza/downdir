import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import site from "../config/site";
import downdir from "../lib/downdir";
import { tokenStore } from "../lib/downdir/utility";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [repo, setRepo] = useState({
    url: {
      name: "url",
      type: "url",
      placeholder:
        "https://github.com/tailwindlabs/tailwindcss/tree/master/src/css",
      label: "Directory/file URL",
      value: "",
      required: true,
    },
    token: {
      name: "token",
      type: "text",
      placeholder: "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxjk",
      label: "Token",
      value: "",
    },
  });

  useEffect(() => {
    const token = tokenStore.get();
    if (token) {
      setRepo((prev) => ({
        ...prev,
        token: { ...prev.token, value: token },
      }));
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const { token, url } = repo;
      tokenStore.set(token.value);
      await downdir(url.value, token.value);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof TypeError) {
        setError(`${error.name}: ${error.message} (maybe the file is too big)`);
      } else {
        setError(error.message);
      }
      setIsLoading(false);
    }
  };

  const inputChangeHandler = (e) => {
    setRepo((prev) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name],
        value: e.target.value,
      },
    }));
  };

  return (
    <div className="max-w-xl mx-auto w-full my-12 px-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">{site.name}</h1>
        <p className="font-sans text-lg font-medium text-center">
          {site.description}
        </p>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-4 mt-8"
      >
        {Object.values(repo).map((repoInfo) => (
          <Input
            key={repoInfo.name}
            onChange={inputChangeHandler}
            {...repoInfo}
          />
        ))}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button isLoading={isLoading} type="submit">
          Submit
        </Button>
      </form>
      <a
        className="text-blue-700 text-sm mt-2 block"
        href="https://github.com/settings/tokens/new"
        target="_blank"
        rel="noopener noreferrer"
      >
        Create token
      </a>
    </div>
  );
}
