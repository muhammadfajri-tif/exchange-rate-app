import "./validateEnv";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ContextProvider from "./context/Context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
