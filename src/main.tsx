// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactQueryProvider } from "./providers/ReactQueryProvider.tsx";
import store from "./store/index.ts";
import { router } from "./routes.tsx"; // Import the router from the extracted file



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactQueryProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" expand={false} />
      </ReactQueryProvider>
    </Provider>
  </React.StrictMode>
);
