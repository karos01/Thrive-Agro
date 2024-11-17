import React from "react";
import Link from "next/link";
import { Home, Store, BadgeAlert, LogOut } from "lucide-react";
import Image from "next/image";
import "@/components/Sidebarcs.css";

const Sidebar = () => {
  return (
    <div className="parentsidebar w-56">
      <div className="sidebar">
        <div className="sideitem ">
          <Link
            className="flex justify-around items-center text-sm font-medium "
            href="/"
          >
            <Image src="/logo.png" alt="logo" width="40" height="25" />
            <h3 className=".font-bold text-xl">ThriveAgro</h3>
          </Link>
        </div>

        <div className="sideitem active">
          <Home color="#FFFFFF" />
          <Link href={"/"} className="sideitem">
            Home
          </Link>
        </div>
        {/* <div className="sideitem">
          <Store color="#FFFFFF" />
          <Link href={"/inventory"} className="sideitem">
            Inventory
          </Link>
        </div> */}
        <div className="sideitem">
          <BadgeAlert color="#FFFFFF" />
          <Link href={"/seva-sangh"} className="sideitem">
            Report an Issue
          </Link>
        </div>

        <div className="sideitem" id="logout">
          <LogOut color="#FFFFFF" />
          <Link href={"/logout"} className="sideitem">
            {" "}
            Logout
          </Link>
        </div>
      </div>
               
    </div>
  );
};

export default Sidebar;
