import React from "react";
import App from "./App";

import { createRoot } from "react-dom/client";
import ApolloProvider from "./providers/ApolloProvider";

const root = document.getElementById("root");

const reactRoot = createRoot(root);

reactRoot.render(
  <ApolloProvider>
    <App />
  </ApolloProvider>
);
