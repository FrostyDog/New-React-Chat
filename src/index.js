import React from "react";
import ReactDOM from "react-dom";
import Chat from "./components/Chat";
import store from "./redux/store";
import { Provider } from "react-redux";

import "./styles.css";

function App() {
  window.store = store;
  return (
    <div className="app">
      <Chat />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, rootElement);
