import React from "react";
import { throttle } from "lodash";

import { useEffect, useCallback } from "react";

const SuggestionVideo = ({ videoTitle,  suggestionsVideos, getMoreSuggestionsVideos}) => {

  const handleScroll = useCallback(throttle(() => {
    if(document.body.scrollHeight <= window.scrollY + window.innerHeight) {
      getMoreSuggestionsVideos()
    }
  }, 2000), [getMoreSuggestionsVideos])

  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div>
        {suggestionsVideos?.map((e, index) => (
          <div key={index} className="suggestion-list-container">
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

export default React.memo(SuggestionVideo);
