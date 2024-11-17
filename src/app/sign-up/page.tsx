"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { signup } from "@/actions/user";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface userDetails {
  email: string;
  password_hash: string;
  name: string;
  user_type: string;
}
interface response {
  token: undefined | string;
  success: boolean;
  user_type: string;
}

const Page = () => {
  const [userDetails, setUserDetails] = useState<userDetails>({
    email: "",
    password_hash: "",
    name: "",
    user_type: "",
  });

  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  async function onSubmit() {
    setLoading(true);
    try {
      console.log(userDetails);
      const res: response = await signup(userDetails);
      console.log(res);

      if (res.user_type === "buyer") {
        window.location.href = "/dashboard";
      } else if (res.user_type === "seller") {
        window.location.href = "/dashboard";
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <Image
          className="mx-auto h-10 w-auto"
          src=""
          alt="Your Company"
          width={40}
          height={40}
        /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) =>
                  setUserDetails({
                    name: e.target.value,
                    email: userDetails.email,
                    password_hash: userDetails.password_hash,
                    user_type: userDetails.user_type,
                  })
                }
                required
                className="block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    email: e.target.value,
                  })
                }
                className="block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    password_hash: e.target.value,
                  });
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <Select
              onValueChange={(e: string) => {
                setUserDetails({
                  ...userDetails,
                  user_type: e,
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            {loading ? (
              <Button
                disabled
                className="flex w-full justify-center rounded-md bg-[#000000] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#a16207] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <button
                onClick={onSubmit}
                disabled={
                  !userDetails.email ||
                  !userDetails.password_hash ||
                  !userDetails.name ||
                  !userDetails.user_type
                }
                className="flex w-full justify-center rounded-md bg-[#000000] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#a16207] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Registered already?{" "}
          <Link
            href="/sign-in"
            className="font-semibold leading-6 text-[#a16207] hover:text-black"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
