import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Head from "./Head";


const Body = () => {
  return (
    <div>

        <Head />
      <div className="flex m-4">
        <SideBar />
        <div className="overflow-hidden flex-1">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Body