const saveFile = (blob, fileName) => {
  const a = document.createElement("a");
  document.body.appendChild(a);
  const blobRaw = new Blob([blob], { type: "octet/stream" });
  const url = window.URL.createObjectURL(blobRaw);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
};

const base64toBlob = async (base64, type = "application/octet-stream") => {
  const res = await fetch(`data:${type};base64,${base64}`);
  return res.blob();
};

const getRepoInfoFromUrl = (url) => {
  const pathname = new URL(url).pathname;
  const [author, repoName, , branch] = pathname.split("/").filter((x) => x);
  const rootDir = pathname.substring(
    pathname.indexOf(branch) + branch.length + 1
  );
  return { author, repoName, branch, rootDir };
};

const tokenStore = {
  set: (token) => localStorage.setItem("gtk", token),
  get: () => localStorage.getItem("gtk"),
};

const outputFactory = (isBlob, fileName, data) => ({ isBlob, fileName, data });

export {
  saveFile,
  base64toBlob,
  getRepoInfoFromUrl,
  tokenStore,
  outputFactory,
};
