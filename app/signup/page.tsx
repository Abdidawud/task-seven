import React from "react";
import SignUpcomp from "../api/auth/signup/SignUpcomp";
import { config } from "@/config";

const SignUp = () => {
  console.log(process.env.GOOGLE_CLIENT_ID);
  console.log("process.env.GOOGLE_CLIENT_SECRET: ", config.googleClientSecret);

  return (
    <div>
      <SignUpcomp />
    </div>
  );
};

export default SignUp;
