import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import toastOptions from "./utils/toast.options.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
      <Toaster toastOptions={toastOptions} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
);
