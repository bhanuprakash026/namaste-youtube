import { CircleUserRound, Earth, SquarePlay, Info } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { FaChartLine } from 'react-icons/fa';

const ChannelDetailsPopup = ({ description, onClose, subscribers, videoCount, totalViewsCount, joinedAt, country }) => {

  const popupRef = useRef(null)
  
  let apiDateString = joinedAt
  console.log(apiDateString)
  const apiDate = new Date(apiDateString);
  

  function formatDate(date) {
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day.toString().padStart(2, '0')}-${months[monthIndex]}-${year}`;
  }

  



  useEffect(() => {
    console.log(joinedAt)
    let handler = (e) => {
      if (popupRef.current !== null && popupRef.current !== undefined) {
        if (!popupRef.current.contains(e.target)) {
          onClose(false)
        }
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])


  return (
    <div className="fixed mx-auto p-6 inset-0 flex flex-col justify-center items-center z-50">
      <div
        ref={popupRef}
        className="bg-white w-[800px] h-[600px] overflow-y-auto p-7 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl mb-3 font-bold">About</h1>
        <p className="whitespace-pre-line mb-3 font-poppins text-lg">{description}</p>
  
        <h1 className="text-2xl font-poppins font-bold">Channel details</h1>
        <div className="flex gap-4 my-4 items-center">
          <CircleUserRound size={40} strokeWidth={0.5} />
          <h6>{subscribers} Subscribers</h6>
        </div>
  
        <div className="flex gap-4 mb-4 items-center">
          <SquarePlay size={40} strokeWidth={0.5} />
          <h6>{videoCount} Videos</h6>
        </div>
  
        <div className="flex gap-4 mb-4 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chart-line"
          >
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
          <h6>{totalViewsCount} Views</h6>
        </div>
  
        <div className="flex gap-4 mb-4 items-center">
          <Earth size={40} strokeWidth={0.5} />
          <h6>Joined {formatDate(apiDate)}</h6>
        </div>
  
        <div className="flex gap-4 mb-4 items-center">
          <Info size={40} strokeWidth={0.5} />
          <h6>{country}</h6>
        </div>
        <button onClick={onClose} className="mt-3 font-bold text-xl text-blue-500">
          Close
        </button>
      </div>
    </div>
  );
  
};

export default ChannelDetailsPopup;
