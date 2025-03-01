import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalStyle } from "./components/App/App.styled";
import App from "./components/App/App";
createRoot(document.getElementById("root")).render(
  <>
      <GlobalStyle />
      <App />
  </>
);
