declare interface Window {
  api: API;
}

interface API {
  fetchFileList(folderPath: string): string[];
}
