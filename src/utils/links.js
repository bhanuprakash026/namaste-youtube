import { IoHome } from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaHistory, FaFire } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";
import { MdOutlineLiveTv } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import { MdOutlineSportsEsports } from "react-icons/md";

export const tabsList = [
  {tabId: "ALL", displayText: "All"},
  {tabId: "HOME", displayText: "Home"},
  {tabId: "GAMING", displayText: "Gaming"},
  {tabId: "LIVE", displayText: "Live"},
  {tabId: "MUSIC", displayText: "Music"},
  {tabId: "HTML", displayText: "HTML"},
  {tabId: "PYTHON", displayText: "Python"},
  {tabId: "WEB_SERIES", displayText: "Web series"},
  {tabId: "T_SERIES", displayText: "T-Series"},
]

export const sideNavLinks = [
  {icon: <IoHome size={25} style={{marginRight: 20}}/>, displayText: "Home", navLinkId: "HOME", link: "/"},
  {icon: <SiYoutubeshorts size={25} style={{marginRight: 20}}/>, displayText: "Shorts", navLinkId: "SHORTS", link: "shorts"},
  {icon: <MdOutlineSubscriptions size={25} style={{marginRight: 20}}/>, displayText: "Subscriptions", navLinkId: "SUBSCRIPTIONS", link: "subscriptions"},
  {icon: <FaHistory size={25} style={{marginRight: 20}}/>, displayText: "History", navLinkId: "HISTORY", link: "history"},
]

export const explore = [
  {icon: <FaFire size={25} style={{marginRight: 20}}/>, displayText: "Trending", navLinkId: "TRENDING"},
  {icon: <IoMdMusicalNote size={25} style={{marginRight: 20}}/>, displayText: "Music", navLinkId: "MUSIC"},
  {icon: <MdOutlineLiveTv size={25} style={{marginRight: 20}}/>, displayText: "Live", navLinkId: "LIVE"},
  {icon: <FaRegNewspaper size={25} style={{marginRight: 20}}/>, displayText: "News", navLinkId: "NEWS"},
  {icon: <MdOutlineSportsEsports size={25} style={{marginRight: 20}}/>, displayText: "Games", navLinkId: "GAMES"},
]