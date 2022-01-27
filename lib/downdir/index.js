import downloadDirectory from "./downloadDirectory";
import downloadFile from "./downloadFile";
import downloadRepository from "./downloadRepository";
import urlChecker from "./urlChecker";
import { saveFile } from "./utility";

const downloadHandler = async (url, token) => {
  if (urlChecker.isDirectory(url)) {
    return downloadDirectory(url, token);
  }

  if (urlChecker.isFile(url, token)) {
    return downloadFile(url, token);
  }

  if (urlChecker.isRepository(url, token)) {
    return downloadRepository(url);
  }

  throw new Error("Invalid URL");
};

const downdir = async (url, token) => {
  const { isBlob, fileName, data } = await downloadHandler(url, token);
  if (isBlob) {
    saveFile(data, fileName);
  } else {
    window.location.href = data;
  }
};

export default downdir;
