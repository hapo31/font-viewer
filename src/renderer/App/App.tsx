import styled from "styled-components";
import Container from "../Styled/Container";
import FontExplorer from "./FontExplorer/FontExplorer";

const App = () => {
  return (
    <Container>
      <ExplorerGrid>
        <FontExplorer />
      </ExplorerGrid>
      <PreviewGrid></PreviewGrid>
    </Container>
  );
};

export default App;

const ExplorerGrid = styled.div``;
const PreviewGrid = styled.div``;
