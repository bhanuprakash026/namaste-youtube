import React from "react";
import { UserRound, Search, Menu } from 'lucide-react';
import { useDispatch } from "react-redux";
import { toggleMenu } from "../redux/navSlice";


const Head = () => {
  const dispatch = useDispatch()

  const handleMenu = () => {
    dispatch(toggleMenu())
  }

  return (
    <div className="grid grid-flow-col shadow-lg items-center p-4">
      <div className="flex items-center col-span-1">
        <Menu size={38} color='gray' className="cursor-pointer " onClick={() => handleMenu()}/>
        <img className='h-8 mx-4 cursor-pointer' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/640px-Logo_of_YouTube_%282015-2017%29.svg.png' alt='yt-logo' />
      </div>

      <div class="hidden md:flex col-span-10 justify-center">
        <input type='text' class="w-1/3 border border-gray-400 p-2 rounded rounded-l-full" />
        <button class="border bg-slate-100 border-gray-400 py-2 px-3 rounded-r-full"><Search color='gray' /></button>
      </div>

      <div className="col-span-1 flex justify-end mx-2">
        < UserRound color='gray' size={38} />
      </div>
    </div>
  )
}

export default Head