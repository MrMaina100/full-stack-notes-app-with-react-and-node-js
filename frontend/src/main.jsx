import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { NoteContextProvider } from "./context/NoteContext.jsx";
import Auth0ProviderWithHistory from "./auth0Provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithHistory>
        <NoteContextProvider>
          <ChakraProvider>
            <App />
            <ReactQueryDevtools />
          </ChakraProvider>
        </NoteContextProvider>
      </Auth0ProviderWithHistory>
    </QueryClientProvider>
  </React.StrictMode>
);
