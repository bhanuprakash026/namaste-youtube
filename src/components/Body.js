import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Head from "./Head";
import { useSelector } from "react-redux";

const Body = () => {
  const isSidebarOpen = useSelector((store) => store.nav.isMenuOpen);

  return (
    <div>
      <Head />
      <div className="flex m-4">
        {isSidebarOpen && <SideBar />} {/* Sidebar only rendered if open */}
        <div
          className={`${isSidebarOpen ? "main-conter-nav-open" : "main-conter-nav-close"} flex justify-center`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
