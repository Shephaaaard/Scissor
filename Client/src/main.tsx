import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import UseSession from "./hooks/UseSession.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UseSession>
      <App />
    </UseSession>

    <Toaster />
  </StrictMode>
);
