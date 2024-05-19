import { useState, useEffect } from 'react';
import React from 'react';
import './WatchPage.css';
import { SUGGESTIONS_VIDEOS_API } from '../../utils/constantsAPI';

const SuggestionVideo = ({ videoTitle }) => {
  const [suggestionVideoData, setSuggestionVideoData] = useState();

  const fetchSuggestionsVideos = async () => {
    if (!videoTitle) {
      console.error("Video title is undefined");
      return;
    }
    try {
      const response = await fetch(`${SUGGESTIONS_VIDEOS_API}&q=${videoTitle}&maxResults=100`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setSuggestionVideoData(json);
    } catch (error) {
      console.error("Failed to fetch suggestion videos:", error);
    }
  };

  useEffect(() => {
    fetchSuggestionsVideos();
    
    // eslint-disable-next-line
  }, [videoTitle]);

  return (
    <>
      {suggestionVideoData?.items?.map((e, index) => (
        <div key={index} className='suggestion-list-container'>
          <img className='h-[120px]' src={e.snippet?.thumbnails?.medium?.url} alt={e.snippet?.title} />
          <div className='suggestion-list-description-container'>
            <p className='text-left text-ellipsis overflow-hidden'> {e.snippet?.title}</p>
            <p className='text-left text-ellipsis overflow-hidden'>{e.snippet?.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default SuggestionVideo;
