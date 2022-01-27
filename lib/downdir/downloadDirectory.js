import JSZip from "jszip";
import { base64toBlob, getRepoInfoFromUrl, outputFactory } from "./utility";

const isPrivateRepo = async (author, repoName, token) => {
  const header = token
    ? {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    : {};

  const res = await fetch(
    `https://api.github.com/repos/${author}/${repoName}`,
    header
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
    throw new Error(`Something went wrong: ${res.statusText} | ${repoName}`);
  }

  const data = await res.json();
  return data.private;
};

const fetchPrivateFile = async (file, token) => {
  const header = token
    ? {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    : {};

  const res = await fetch(file.url, header);
  if (!res.ok) {
    throw new Error(`Something went wrong: ${res.statusText} | ${file.url}`);
  }
  const { content } = await res.json();
  return base64toBlob(content);
};

const fetchPublicFile = async ({ author, repoName, branch }, file) => {
  const res = await fetch(
    `https://raw.githubusercontent.com/${author}/${repoName}/${branch}/${file.path}`
  );
  if (!res.ok) {
    throw new Error(`Something went wrong: ${res.statusText} | ${file.path}`);
  }
  return res.blob();
};

const getFiles = async (author, repoName, branch, rootDir, token) => {
  const header = token
    ? {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    : {};
  const res = await fetch(
    `https://api.github.com/repos/${author}/${repoName}/git/trees/${branch}?recursive=1`,
    header
  );
  const tressData = await res.json();
  const files = [];
  for (const tree of tressData.tree) {
    if (tree.type === "blob" && tree.path.startsWith(rootDir)) {
      files.push(tree);
    }
  }
  return files;
};

const zipFiles = async (files, fetcher) => {
  const zip = new JSZip();
  await Promise.all(
    files.map(async (file) => {
      const blob = await fetcher(file);
      zip.file(file.path, blob);
    })
  );
  return zip.generateAsync({ type: "blob" });
};

const downloadDirectory = async (targetUrl, token) => {
  const { rootDir, author, branch, repoName } = getRepoInfoFromUrl(targetUrl);
  const isPrivate = await isPrivateRepo(author, repoName, token);
  const files = await getFiles(author, repoName, branch, rootDir, token);

  const fetcher = isPrivate
    ? (file) => fetchPrivateFile(file, token)
    : (file) => fetchPublicFile({ author, repoName, branch }, file);

  const filesZippedBlob = await zipFiles(files, fetcher);
  const fileName = `${repoName}-${rootDir.replace("/", "-")}.zip`;
  return outputFactory(true, fileName, filesZippedBlob);
};

export default downloadDirectory;
