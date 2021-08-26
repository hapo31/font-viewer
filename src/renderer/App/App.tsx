import { Provider } from "react-redux";
import { createStore } from "redux";
import appReducer from "../store/AppStore";
import styled from "styled-components";
import Container from "../Styled/Container";
import FontExplorer from "./FontExplorer/FontExplorer";

const store = createStore(appReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <ExplorerGrid>
          <FontExplorer />
        </ExplorerGrid>
        <PreviewGrid></PreviewGrid>
      </Container>
    </Provider>
  );
};

export default App;

const ExplorerGrid = styled.div``;
const PreviewGrid = styled.div``;
