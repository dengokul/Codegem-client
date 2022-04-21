import { BrowserRouter } from "react-router-dom";
import Routes from "routes/routes";
import { ApolloProvider, client } from "utils/ApolloUtils";

const App = () => {
  return (
      <BrowserRouter>
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
      </BrowserRouter>
  );
};

export default App;
