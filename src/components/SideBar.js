import React, { useState } from "react";
import { useSelector } from "react-redux";
import { sideNavLinks, explore } from "../utils/links";
import { Link } from "react-router-dom";


const SideBar = () => {
  const isOpen = useSelector((Store) => Store.nav.isMenuOpen)
  const [activeLink, setActiveLink] = useState("HOME")

  // This type of code is calling Early Return Pattern
  if (!isOpen) return null;
  return (
    <div className="h-screen mt-3 fixe pr-3">
      <ul className="items">
        {sideNavLinks.map((e) => (
          <li className={activeLink === e.navLinkId ? "bg-slate-200 rounded-lg icon flex items-center p-3 hover:cursor-pointer mb-2" : "icon flex items-center p-3 hover:cursor-pointer mb-2 hover:rounded-lg hover:bg-slate-100"} key={e.navLinkId} onClick={() => setActiveLink(e.navLinkId)}>
            <Link to={e.link} className="flex">
              {e.icon}
              {e.displayText}
            </Link>
          </li>
        ))}
      </ul>

      <hr />

      <ul className="items">
        {explore.map((e) => (
          <li className={activeLink === e.navLinkId ? "bg-slate-200 rounded-lg icon flex items-center p-3 hover:cursor-pointer mb-2" : "icon flex items-center p-3 hover:cursor-pointer hover:rounded-lg mb-2 hover:bg-slate-100"} key={e.navLinkId} onClick={() => setActiveLink(e.navLinkId)}>
            {e.icon}
            {e.displayText}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default SideBar