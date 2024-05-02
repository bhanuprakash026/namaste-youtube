import React, { useState, useEffect } from "react";
import { UserRound, Search, Menu } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../redux/navSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constantsAPI";
import { cacheResult } from "../redux/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestionsList, setSuggestionsList] = useState([])
  const [showSuggestionsList, setShowSuggestionsList] = useState(false)
  const dispatch = useDispatch()
  const searchCache = useSelector((Store) => Store.search)

  useEffect(() => {

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestionsList(searchCache[searchQuery])
      } else {
        getSearchSuggestions()
      }
    }, 200)
    return () => {
      clearTimeout(timer)
    }
    // eslint ignore
  }, [searchQuery])

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
    const json = await data.json()
    setSuggestionsList(json[1])

    //update cacheResult function in redux
    dispatch(cacheResult({
      [searchQuery]: json[1]
    }))
  }

  const handleMenu = () => {
    dispatch(toggleMenu())
  }

  return (

    <div className="navbar grid grid-flow-col shadow-lg p-4">
      <div className="col-span-1">
        <div className="flex items-center">
          <Menu size={38} color='gray' className="cursor-pointer " onClick={() => handleMenu()} />
          <img className='h-8 mx-4 cursor-pointer' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/640px-Logo_of_YouTube_%282015-2017%29.svg.png' alt='yt-logo' />
        </div>
      </div>

      <div className="col-span-10 flex flex-row justify-center items-center">
        <input
          type='text'
          class="w-1/2 border border-gray-400 p-2 rounded rounded-l-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestionsList(true)}
          // onBlur={() => setShowSuggestionsList(false)}
        />
        <button className="border bg-slate-100 border-gray-400 py-2 px-3 rounded-r-full"><Search color='gray' /></button>
        {(suggestionsList.length > 0 && showSuggestionsList) && (<div className="absolute items-center rounded-xl top-[70px] shadow-xl bg-white border border-[#c2c2c2] w-1/3">
          <ul className="flex flex-col items-start">
            {suggestionsList.map((s) => (
              <li className="p-2" onClick={() => setSearchQuery(s)}>{s}</li>
            ))}
          </ul>
        </div>)}



      </div>

      <div className="col-span-1">
        <div className="flex justify-end mx-2">
          < UserRound color='gray' size={38} />
        </div>
      </div>
    </div>

  )
}

export default Head
