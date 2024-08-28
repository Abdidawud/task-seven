"use client";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpcomp = () => {
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          role: "user",
        }),
      });

      console.log("login in user");

      const result = await response.json();
      console.log("result of user logged in ", result);

      if (response.ok) {
        localStorage.setItem("user", data.email);
        router.push(`/verification?email=${data.email}`);
      } else {
        alert("error happen");
        console.error("Sign-up failed:", result.message);
      }
    } catch (error) {
      alert("catch error");
      console.error("An error occurred:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const response = await signIn("google");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-black mb-6 text-slate-900 text-center font-poppins">
          Sign Up Today,
        </h1>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-violet-800 bg-white hover:bg-gray-50 mb-4 font-epilogue"
        >
          <FcGoogle className="mr-2" />
          Sign Up with Google
        </button>
        <p className="text-center text-slate-500 mb-4 font-epilogue">
          Or Sign Up with Email
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4 font-epilogue"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 font-epilogue"
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <p className="mt-2 text-sm text-red-600">{errors.name?.message}</p>
          </div>
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
              id="email"
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
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <p className="mt-2 text-sm text-red-600">
              {errors.password?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Enter password again"
              id="confirmPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
            <p className="mt-2 text-sm text-red-600">
              {errors.confirmPassword?.message}
            </p>
          </div>
          <button className="w-full py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-violet-800 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
            Continue
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <span className="text-violet-800 hover:text-indigo-500 cursor-pointer">
              Login
            </span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            By clicking 'Continue' you acknowledge and agree to the{" "}
            <span className="text-violet-600 hover:text-violet-500 cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-violet-600 hover:text-violet-500 cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpcomp;
