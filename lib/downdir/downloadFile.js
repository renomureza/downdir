import { getRepoInfoFromUrl, outputFactory } from "./utility";

const fetchFile = async (author, repoName, branch, rootDir, token) => {
  const res = await fetch(
    `https://api.github.com/repos/${author}/${repoName}/contents/${rootDir}?ref=${branch}`,
    {
      headers: {
        Accept: "application/vnd.github.v3.raw",
        ...(token && { Authorization: `token ${token}` }),
      },
    }
  );

  if (res.status === 401) {
    throw new Error("invalid token");
  }

  if (res.status === 403) {
    throw new Error("rate limit exceeded");
  }

  if (res.status === 404 && token) {
    throw new Error("repo not found");
  }

  if (res.status === 404 && !token) {
    throw new Error("repo not found, posible is private repo");
  }

  if (!res.ok) {
    throw new Error(`Something went wrong: ${res.statusText} | ${rootDir}`);
  }

  return res.blob();
};

const downloadFile = async (url, token) => {
  const { author, repoName, rootDir, branch } = getRepoInfoFromUrl(url);
  const blob = await fetchFile(author, repoName, branch, rootDir, token);
  return outputFactory(true, rootDir, blob);
};

export default downloadFile;
