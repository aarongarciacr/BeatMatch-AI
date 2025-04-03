import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { Modal, ModalProvider } from "./context/Modal";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);
