"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const SignINcomp = () => {
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/main");
    }
    if (!res?.ok) {
      {
        console.error("Sign-in failed");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <header className="text-2xl font-bold mb-6 text-center">
          Welcome Back,
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4 font-epilogue"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
          </div>
          <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <span className="text-indigo-600 hover:text-indigo-500 cursor-pointer">
              <Link href="/signup">SignUp</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignINcomp;
