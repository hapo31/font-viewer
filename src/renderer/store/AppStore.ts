import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  isFolderOpen: false,
  folderPath: "",
  selectedFontFilePath: "",
  text: "",
  filePaths: [] as string[],
};

export type AppState = typeof initialState;

export const fetchFileList = createAsyncThunk(
  "app/fetchFileList",
  async (folderPath: string) => {
    const files = await window.api.fetchFileList(folderPath);
    return files;
  }
);

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeFont: (state, action: PayloadAction<{ filePath: string }>) => {
      state.selectedFontFilePath = action.payload.filePath;
    },

    setText: (state, action: PayloadAction<{ text: string }>) => {
      state.text = action.payload.text;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFileList.fulfilled, (state, action) => {
      state.filePaths = action.payload;
      state.isFolderOpen = true;
    });
  },
});

export const { changeFont, setText } = slice.actions;

const AppReducer = slice.reducer;

export default AppReducer;

export function useAppState<T>(selector: (state: AppState) => T) {
  return useSelector(selector);
}
