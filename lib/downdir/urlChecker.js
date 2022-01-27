// https://github.com/facebook/react/tree/main/.circleci
// https://github.com/facebook/react/tree/main/packages/react-client
const isDirectory = (url) => {
  const pathname = new URL(url).pathname.split("/");
  return pathname.includes("tree") && pathname.length > 5;
};

// https://github.com/facebook/react/blob/main/packages/react-pg/index.js
// https://github.com/facebook/react/blob/main/package.json
const isFile = (url) => {
  const pathname = new URL(url).pathname.split("/");
  return pathname[3] === "blob";
};

// https://github.com/facebook/react
// https://github.com/facebook/react/tree/17.0.2
const isRepository = (url) => {
  const pathname = new URL(url).pathname.split("/").filter((x) => x);
  return (
    pathname.length === 2 ||
    (pathname.length === 4 && pathname.includes("tree"))
  );
};

const urlChecker = { isRepository, isFile, isDirectory };
export default urlChecker;
