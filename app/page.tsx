"use client";

import React from "react";
import { Provider } from "react-redux";
import Home from "./main";
import { store } from "./store";

const page = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default page;
