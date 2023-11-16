import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_WEBINY_GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_WEBINY_GRAPHQL_TOKEN}`,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
