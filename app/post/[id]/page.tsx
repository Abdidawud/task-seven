"use client";
import React from "react";
import Description from "@/app/components/description";
import { Provider } from "react-redux";
import { store } from "@/app/store";

const page = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);
  return (
    <Provider store={store}>
      {" "}
      <Description id={id} />
    </Provider>
  );
};

export default page;
