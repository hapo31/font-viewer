import styled from "styled-components";
import { ChangeEvent, DragEvent, useState } from "react";
import { changeFont, fetchFileList, useAppState } from "../../store/AppStore";
import Container from "../../Styled/Container";
import { useDispatch } from "react-redux";
import InputDirectory from "../../common/InputDirectory";
import getFolderPathFromFilePath from "../../lib/getFolderPathFromFilePath";

const FontExplorer = () => {
  const { isFolderOpen, filePaths } = useAppState();

  const dispatch = useDispatch();

  const [isDrag, setIsDrag] = useState(false);

  const onFileInput = (files: FileList) => {
    const file = files.item(0);
    if (file == null) {
      return;
    }
    const folderPath = getFolderPathFromFilePath(file.path);
    dispatch(fetchFileList(folderPath));
  };

  return (
    <Container>
      {isFolderOpen ? (
        <FontList>
          {filePaths.map((file, i) => (
            <FontListItem
              onClick={() => {
                dispatch(changeFont({ filePath: file }));
              }}
              key={`${i}-${file}`}
            >
              {file}
            </FontListItem>
          ))}
        </FontList>
      ) : (
        <DropAreaContainer>
          <DropInput
            className={isDrag ? `drag-over` : ""}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDrag(true);
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log({ e });
              if (!e.target.files) {
                return;
              }
              onFileInput(e.target.files);
            }}
            onDrop={(e: DragEvent<HTMLInputElement>) => {
              console.log({ e });
              e.preventDefault();
              const { files } = e.dataTransfer;
              onFileInput(files);
            }}
            onDragLeave={() => {
              setIsDrag(false);
            }}
          />
        </DropAreaContainer>
      )}
    </Container>
  );
};

export default FontExplorer;

const DropAreaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 50px 50px;
  border: solid 2px black;
`;

const DropInput = styled(InputDirectory)`
  width: 100%;
  min-width: 120px;
  height: 100%;
  &drag-over {
    background-color: red;
  }
`;

const FontList = styled.ul`
  overflow-y: scroll;
  list-style: none;
  height: 100vh;
`;

const FontListItem = styled.li`
  :hover {
    background-color: #999;
  }
`;
