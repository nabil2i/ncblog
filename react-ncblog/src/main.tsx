import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";

import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store.ts";
import "./index.css";
import router from "./routes.tsx";
import theme from "./theme.ts";
import { disableReactDevTools} from '@fvilers/disable-react-devtools';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import AdminLayoutProvider from "./components/admin/AdminLayoutProvider.tsx";

if (process.env.NODE_ENV === 'production') disableReactDevTools();

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
        <Provider store={store}>
        {/* <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%"> */}
        <AdminLayoutProvider>
            <RouterProvider router={router} />
        </AdminLayoutProvider>
          {/* </Theme> */}
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);

