"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Loader } from "@react-three/drei";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { PiGoogleLogo, PiGoogleLogoBold } from "react-icons/pi";

const SignInPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center bg-gray-900 dark">
      <div className="relative sm:py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 transition duration-300 delay-0"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-pink-400 to-yellow-300"></div>
        </div>
        <div className="relative xl:container m-auto px-2 sm:px-4  text-gray-500 md:px-12">
          <div className="m-auto space-y-8 sm:w-4/5 md:w-3/5 xl:w-2/5">
            <div className="py-8 px-2 md:p-8 md:py-12">
              <Link href={"/"} className="flex gap-3 items-center">
                <img
                  src="/bb-logo.svg"
                  loading="lazy"
                  className="w-10"
                  alt="bestbrain logo"
                />
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  Bestbrain
                </p>
              </Link>
              <h2 className="mt-20 mb-8 text-3xl font-bold text-gray-800 dark:text-white">
                Welcome back to Bestbrain.
              </h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label
                    htmlFor="email"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    Provide your details to sign in.
                  </Label>
                  <div className="relative text-muted-foreground flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 absolute left-4 inset-y-0 my-auto"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    <Input
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email address"
                      className="focus:outline-none block w-full rounded-full placeholder-gray-600 !border-none dark:bg-gray-800 text-muted-foreground dark:border-gray-600 pl-12 pr-4 h-12  transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary"
                    />
                    <div className="absolute right-1">
                      <LoginLink
                        authUrlParams={{
                          connection_id:
                            process.env.NEXT_PUBLIC_KINDE_EMAIL_CONNECTION!,
                          login_hint: email,
                        }}
                        className="relative flex h-10 w-10 sm:w-max ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="relative w-5 h-5 text-white dark:text-gray-900 "
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </LoginLink>
                    </div>
                  </div>
                </div>

                <LoginLink
                  onClick={() => setLoading(true)}
                  authUrlParams={{
                    connection_id:
                      process.env.NEXT_PUBLIC_KINDE_GOOGLE_CONNECTION!,
                  }}
                  className="focus:outline-none  w-full rounded-full text-muted-foreground bg-gray-100 dark:bg-gray-800 dark:border-gray-600 pl-12 pr-4 h-12 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary flex items-center justify-start  relative font-normal  "
                >
                  {loading ? (
                    <div>
                      <Loader2 className="w-6 h-6 absolute left-4 inset-y-0 my-auto animate-spin " />
                      <span className="ml-2">Loading...</span>
                    </div>
                  ) : (
                    <div>
                      <PiGoogleLogoBold className="w-6 h-6 absolute left-4 inset-y-0 my-auto" />{" "}
                      Continue with Google
                    </div>
                  )}
                </LoginLink>
                <p className="text-gray-500 text-sm">
                  By proceeding, you consent to get emails, calls and SMS
                  messages, including by automated means, from Bestbrain and its
                  affiliates to the information provided.
                </p>

                <p className="border-t border-gray-100 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
                  Don't have an account ?
                  <Link href="/api/auth/register" className="text-primary">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
