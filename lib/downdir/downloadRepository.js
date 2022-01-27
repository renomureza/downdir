import { outputFactory } from "./utility";

const downloadRepository = (targetUrl) => {
  const [, author, repoName, , branch = "master"] = new URL(
    targetUrl
  ).pathname.split("/");
  const downloadableUrl = `https://github.com/${author}/${repoName}/archive/${branch}.zip`;
  return outputFactory(false, null, downloadableUrl);
};

export default downloadRepository;
