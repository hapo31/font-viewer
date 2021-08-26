export default function getFolderPathFromFilePath(path: string) {
  const isWindowsStyle = path.indexOf("\\") !== 0;
  const pathSplitStr = isWindowsStyle ? "\\" : "/";

  const endOfSlash = path.endsWith(pathSplitStr);
  const lastSlashIndex = path.lastIndexOf(
    pathSplitStr,
    endOfSlash ? path.length - 1 : path.length
  );

  return path.substr(0, lastSlashIndex);
}
