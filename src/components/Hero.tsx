import Link from "next/link";
import React from "react";

const Hero = ({ heading, message }: { heading: string; message: string }) => {
  return (
    <div className="flex items-center bg-white justify-center h-screen mb-12 bg-fixed bg-center bg-cover bg-[url('/home1.jpeg')]">
      {/* Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2] mt-[-10rem]">
        <h2 className="text-5xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <div className="py-10 flex justify-around">
          <Link href="/sign-in">
            <button className="px-8 py-2 border">Login</button>
          </Link>
          <Link href="/sign-up">
            <button className="px-8 py-2 border">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
