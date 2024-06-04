import React from "react";
import { useEffect } from "react";

const SuggestionVideo = ({ videoTitle,  suggestionsVideos, getMoreSuggestionsVideos}) => {

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line
  }, [])
  const handleScroll = () => {
    if(document.body.scrollHeight <= window.scrollY + window.innerHeight) {
      getMoreSuggestionsVideos()
    }
  }

  return (
    <div>
      {console.log("SuggestionVideo rendered")}SuggestionVideo {videoTitle}
      <div>
        {suggestionsVideos?.map((e, index) => (
          <div key={index} className="suggestion-list-container">
            {console.log("SuggestionVideo Component Rendered")}
            <img
              className="h-[120px]"
              src={e.snippet?.thumbnails?.medium?.url}
              alt={e.snippet?.title}
            />
            <div className="suggestion-list-description-container">
              <p className="text-left text-ellipsis overflow-hidden">
                {" "}
                {e.snippet?.title}
              </p>
              <p className="text-left text-ellipsis overflow-hidden">
                {e.snippet?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionVideo;
