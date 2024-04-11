import React from "react";
import { tabsList } from "../utils/links";
import { useState } from "react";

const ButtonsList = () => {
  const [activeButtonId, setActiveButtonId] = useState('ALL');

  return (
    <div className="buttons-container overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className="flex mt-3 whitespace-nowrap">
        {tabsList.map((eachTab) => (
          <button
            className={activeButtonId === eachTab.tabId ? "max-w-lg mx-3 activeTab" : "mx-3 bg-gray-200 rounded-md hover:bg-[#2f2f2f] hover:text-white px-6 py-2 font-[500]"}
            onClick={() => setActiveButtonId(eachTab.tabId)}
            key={eachTab.tabId}
          >
            {eachTab.displayText}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonsList;