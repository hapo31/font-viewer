import styled from "styled-components";
import { DragEvent } from "react";
import { fetchFileList, useAppState } from "../../store/AppStore";
import Container from "../../Styled/Container";
import { useDispatch } from "react-redux";

const FontExplorer = () => {
  const { isFolderOpen, filePaths } = useAppState((state) => ({
    isFolderOpen: state.isFolderOpen,
    filePaths: state.filePaths,
  }));

  const dispatch = useDispatch();

  return (
    <Container>
      {isFolderOpen ? (
        <li>
          {filePaths.map((file, i) => (
            <ul key={`${i}-${file}`}>{file}</ul>
          ))}
        </li>
      ) : (
        <DropAreaContainer>
          <DropInput
            onDrop={(e: DragEvent<HTMLInputElement>) => {
              const { files } = e.dataTransfer;
              const file = files.item(0);
              if (file == null) {
                return;
              }
              dispatch(fetchFileList(file.path));
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
`;

const DropInput = styled.input`
  width: 100%;
  height: 100%;
  :hover {
    background-color: red;
  }
`;
