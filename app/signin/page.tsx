"use client";
import React from "react";
import SignINcomp from "../api/auth/signin/SignIncomp";
import { SessionProvider } from "next-auth/react";

const SignIn = () => {
  return (
    <div>
      <SessionProvider>
        <SignINcomp />
      </SessionProvider>
    </div>
  );
};

export default SignIn;
