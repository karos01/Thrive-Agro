"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Headerlanding = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff");
        setTextColor("#000000");
      } else {
        setColor("transparent");
        setTextColor("#ffffff");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300 bg-white"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
      <Link className=" flex justify-around items-center"href="/">
          <img src="/logo.png" alt="logo" width="70" height="40"/>
          <h1 style={{ color: `${textColor}` }} className="font-bold text-4xl">
            ThriveAgro
          </h1>
        </Link>

        <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
          <li className="p-4">
            <Link href="/">Home</Link>
          </li>
          <li className="p-4">
            <Link href="#features">About Us</Link>
          </li>
          <li className="p-4">
            <Link href="#testimonials">Testimonials</Link>
          </li>
        </ul>

        {/*Mobile menu button  */}
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <X size={20} style={{ color: `${textColor}` }} />
          ) : (
            <Menu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={
          nav
            ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
            : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
        }
      >
        <ul className="hidden sm:flex">
          <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
            <Link href="/">Home</Link>
          </li>
          <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
            <Link href="/#Testimonials">Testimonials</Link>
          </li>
          <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
            <Link href="#features">About Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Headerlanding;
