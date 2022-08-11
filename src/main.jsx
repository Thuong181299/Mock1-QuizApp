import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import GlobalStyles from "./components/GlobalStyles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GlobalStyles>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GlobalStyles>
  // </React.StrictMode>
);
