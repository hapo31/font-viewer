import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  fetchFileList: async (folderPath: string) => {
    return await ipcRenderer.invoke("fetchFileList", folderPath);
  },
});
