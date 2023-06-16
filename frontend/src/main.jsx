import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { NoteContextProvider } from "./context/NoteContext.jsx";
import Auth0ProviderWithHistory from "./auth0Provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <NoteContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </NoteContextProvider>
    </Auth0ProviderWithHistory>
  </React.StrictMode>
);
