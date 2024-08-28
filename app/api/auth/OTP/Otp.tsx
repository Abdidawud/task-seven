"use client";
import React, { useState, ChangeEvent, FocusEvent } from "react";
import { Epilogue } from "next/font/google";
import { useRouter } from "next/navigation";

const OTPComponent: React.FC = () => {
  const email = localStorage.getItem("email");
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [isOtpValid, setIsOtpValid] = useState(false);

  const handleChange = (
    element: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (isNaN(Number(element.target.value))) return;

    setOtp([
      ...otp.map((d, idx) => (idx === index ? element.target.value : d)),
    ]);

    if (element.target.nextSibling) {
      (element.target.nextSibling as HTMLInputElement).focus();
    }

    if (otp.every((digit) => digit !== "")) {
      setIsOtpValid(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Otp = otp.join("");
    console.log("OTP submitted:", Otp);

    const response = await fetch(
      "https://akil-backend.onrender.com/verify-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: Otp,
        }),
      }
    );
    const res = await response.json();
    if (res.success) {
      localStorage.clear();
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      router.push("/");
    } else {
      alert(res.message);
      console.log(res);
    }
  };

  const handleFocus = (element: FocusEvent<HTMLInputElement>) => {
    element.target.select();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-10 text-center font-poppins text-slate-900">
          Verify Email
        </h1>
        <p className="text-slate-400 mb-12 font-epilogue">
          {" "}
          We've sent a verification code to the email address you provided. To
          complete the verification process,please enter the code here.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex-col justify-center space-x-4 mb-6"
        >
          <div className="flex items-center justify-center gap-4">
            {otp.map((data, index) => {
              return (
                <input
                  key={index}
                  className="w-12 h-12  border border-violet-300 rounded-lg shadow-sm text-center text-xl focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                  type="text"
                  name="otp"
                  maxLength={1}
                  value={data}
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  onFocus={handleFocus}
                />
              );
            })}
          </div>
          <button
            type="submit"
            className="my-6 w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 rounded-3xl font-epilogue"
          >
            Continue
          </button>
        </form>
        <div className="mt-6 text-center mb-8">
          <p className="text-sm text-gray-500 font-epilogue">
            You can request to{" "}
            <span className="text-violet-900 hover:text-violet-500 cursor-pointer">
              Resend code{" "}
            </span>
            in <span className="text-violet-900">00:30</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPComponent;
