
import { createRoot } from "react-dom/client";
import "./index.css"; // Global styles
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import { Store } from "./redux/store/store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
    <ToastContainer />
  </Provider>
);
