import { useCallback, useRef } from 'react'
import React from 'react'
import { Link } from 'react-router-dom';

const SuggestionVideo = ({ isLoading, suggestionsVideos, getMoreSuggestionsVideos }) => {

  const observer = useRef();
  const lastSuggestionVideoCard = useCallback((node) => {

    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        getMoreSuggestionsVideos()
      }
    })
    if (node) observer.current.observe(node)
    // eslint-disable-next-line
  }, [isLoading, getMoreSuggestionsVideos]);

  return (
    <>
      {suggestionsVideos?.map((e, index) => {
        if (suggestionsVideos.length === index + 1) {
          return (
            <Link to={`?v=${e?.id?.videoId}`}>
              <div ref={lastSuggestionVideoCard} key={index} className="suggestion-list-container">
                <img
                  className="h-[120px]"
                  src={e.snippet?.thumbnails?.medium?.url}
                  alt={e.snippet?.title}
                />
                <div className="suggestion-list-description-container">
                  <p className="text-left text-ellipsis overflow-hidden">
                    {e.snippet?.title}
                  </p>
                  <p className="text-left text-ellipsis overflow-hidden">
                    {e.snippet?.description}
                  </p>
                </div>
              </div>
            </Link>
          )
        } else {
          return (
            <Link to={`?v=${e?.id?.videoId}`}>
              <div key={index} className="suggestion-list-container">
                <img
                  className="h-[120px] rounded-md mr-2"
                  src={e.snippet?.thumbnails?.medium?.url}
                  alt={e.snippet?.title}
                />
                <div className="suggestion-list-description-container">
                  <p className="text-left text-ellipsis overflow-hidden font-poppins font-bold">
                    {e.snippet?.title}
                  </p>
                  <p className=" text-[#2d2d2d] text-[15px] text-left text-ellipsis overflow-hidden">
                    {e.snippet?.description}
                  </p>
                  <p className='text-[#626262] font-bold text-left'>{e.snippet?.channelTitle}</p>
                </div>
              </div>
            </Link>
          )
        }
      })}
    </>
  )
}

export default SuggestionVideo
