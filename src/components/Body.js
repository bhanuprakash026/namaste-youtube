import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";


const Body = () => {
  return (
    <div className="flex m-4">
      <SideBar />
      <div className="overflow-hidden flex-1">
        <Outlet />
      </div>

    </div>
  )
}

export default Body