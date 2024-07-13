import { useState, useEffect, memo } from 'react'
import React from 'react'
import { Link } from 'react-router-dom';
import useInfiniteScroll from '../../Hooks/useInfiniteScroll';
import { SUGGESTIONS_VIDEOS_API } from '../../utils/constantsAPI';
import { BeatLoader } from 'react-spinners';

const SuggestionVideo = ({ videoId, isLoading, suggestionsVideos, firstSuggestionsVideosToken, videoTitle }) => {
  const [suggestionsVideoData, setSuggestionsVideoData] = useState([]);
  const { data, lastElementRef, loading } = useInfiniteScroll(`${SUGGESTIONS_VIDEOS_API}&q=${videoTitle}&maxResults=5`, suggestionsVideos, firstSuggestionsVideosToken);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setSuggestionsVideoData((prevState) => [...prevState, ...data]);
    }
  }, [data, videoId]);

  useEffect(() => {
    setSuggestionsVideoData(suggestionsVideos);
    // eslint-disable-next-line
  }, [suggestionsVideos]);

  return (
    <>
      {suggestionsVideoData?.map((e, index) => (
        <React.Fragment key={index}>
          <Link to={`?v=${e?.id?.videoId}`}>
            <div ref={index === suggestionsVideoData.length - 1 ? lastElementRef : null} className="suggestion-list-container">
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
                <p className='text-[#626262] font-bold text-left'>{e.snippet?.channelTitle}</p>
              </div>
            </div>
          </Link>
        </React.Fragment>
      ))}
      {isLoading && <BeatLoader color='blue' />}
      {loading && <BeatLoader color='blue' />}
    </>
  );
}

export default memo(SuggestionVideo);
