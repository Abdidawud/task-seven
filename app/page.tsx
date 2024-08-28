"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Home from "./main";
import { store } from "./store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/signin"); // Redirect to sign-in page
    }
  }, [session, router]);

  // if (session?.user) {
  //   return null; // Prevents rendering while redirecting
  // }

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

const MyApp = () => (
  <SessionProvider>
    <Page />
  </SessionProvider>
);

export default MyApp;
