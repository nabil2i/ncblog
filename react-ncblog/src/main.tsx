import "@fontsource/open-sans/700.css";

import "@fontsource/raleway/400.css";

import "@fontsource/crimson-text"; // Defaults to weight 400
import "@fontsource/crimson-text/400.css"; // Specify weight
import "@fontsource/crimson-text/400-italic.css"; // Specify weight and style

import "@fontsource/nunito"; // Defaults to weight 400
import "@fontsource/nunito/400.css"; // Specify weight
import "@fontsource/nunito/400-italic.css"; // Specify weight and style

import "@fontsource/pt-serif"; // Defaults to weight 400
import "@fontsource/pt-serif/400.css"; // Specify weight
import "@fontsource/pt-serif/400-italic.css"; // Specify weight and style

import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style

import "@fontsource/source-sans-pro"; // Defaults to weight 400
import "@fontsource/source-sans-pro/400.css"; // Specify weight
import "@fontsource/source-sans-pro/400-italic.css"; // Specify weight and style

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store, persistor } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import AdminLayoutProvider from "./components/admin/AdminLayoutProvider.tsx";
import "./index.css";
import router from "./routes.tsx";
import theme from "./theme.ts";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const queryClient = new QueryClient();
// {
//   defaultOptions: {
//     queries: {
//       retry: process.env.NODE_APP === 'production',
//       refetchOnWindowFocus: process.env.NODE_APP === 'production',
//     },
//   },
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            {/* <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%"> */}
            <AdminLayoutProvider>
              <RouterProvider router={router} />
            </AdminLayoutProvider>
            {/* </Theme> */}
          </Provider>
        </PersistGate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
