import React, { useState, useEffect, memo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import './index.css'
import useInfiniteScroll from '../../Hooks/useInfiniteScroll';
import { searchAPI, VIDEO_DETAILS } from '../../utils/constantsAPI';


const formatViewCount = (count) => {
  if (count < 1000) return count;
  if (count >= 1000 && count < 1000000) return (count / 1000).toFixed(1) + 'K';
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
  return count;
};

const timeAgo = (timeString) => {
  const now = new Date();
  const past = new Date(timeString);
  const seconds = Math.floor((now - past) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  if (interval === 1) return '1 year ago';

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  if (interval === 1) return '1 month ago';

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  if (interval === 1) return '1 day ago';

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  if (interval === 1) return '1 hour ago';

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  if (interval === 1) return '1 minute ago';

  return 'Just now';
};
const SearchVideoCard = ({ videos, initialPageToken, isLoading }) => {
  const [searchParam] = useSearchParams();
  const param = searchParam.get('search_query');
  const [finalSearchedVideos, setFinalSearchedVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [videosLoading, setVideosLoading] = useState(false);

  const fetchVideoDetails = useCallback(async (videoIds) => {
    try {
      setVideosLoading(true);
      const data = await fetch(`${VIDEO_DETAILS}${videoIds}&key=${process.env.REACT_APP_API_KEY}`);
      const json = await data.json();

      const videoDetails = json.items.map(video => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnails: video.snippet.thumbnails,
        channelTitle: video.snippet.channelTitle,
        channelLink: `https://www.youtube.com/channel/${video.snippet.channelId}`,
        publishedAt: video.snippet.publishedAt,
        viewCount: video.statistics.viewCount,
      }));

      setVideosLoading(false);
      setFinalSearchedVideos(prevVideos => [...prevVideos, ...videoDetails]);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  }, []); // Empty dependency array as fetchVideoDetails does not depend on any external variables

  const { data, lastElementRef, loading, currentJson } = useInfiniteScroll(
    `${searchAPI}&q=${param}&maxResults=30`,
    [],
    nextPageToken
  );

  console.log(data, loading)
  const currentIds = currentJson?.items?.map(item => item?.id?.videoId).join(',');

  useEffect(() => {
    if (Array.isArray(videos) && videos.length > 0) {
      setFinalSearchedVideos(videos);
    }
    setNextPageToken(initialPageToken);
  }, [videos, initialPageToken]); // Added initialPageToken as a dependency

  useEffect(() => {
    if (currentIds !== undefined) {
      fetchVideoDetails(currentIds);
    }
  }, [currentIds, fetchVideoDetails]); // Added fetchVideoDetails as a dependency

  return (
    <div>
      {finalSearchedVideos.map((video, index) => (
        <React.Fragment key={video.id}>
          <Link to={`/watch?v=${video.id}`}>
            <div
              ref={index === finalSearchedVideos.length - 1 ? lastElementRef : null}
              className="card-container"
            >
              <div className="img-container">
                <img
                  className="image"
                  src={video?.thumbnails?.maxres?.url ?? video?.thumbnails?.medium?.url}
                  alt={video.title}
                />
              </div>
              <div className="des-wrapper">
                <h2 className="title-header">{video?.title}</h2>
                <div className="flex gap-3">
                  <p className="views font-poppins">{formatViewCount(video?.viewCount)} Views</p>
                  <p className="date">{timeAgo(video?.publishedAt)}</p>
                </div>
                <p className="description">{video?.description}</p>
                <Link to={`/channel/${video?.channelTitle}`}>
                  <p className="font-bold">{video?.channelTitle}</p>
                </Link>
              </div>
            </div>
          </Link>
        </React.Fragment>
      ))}
      {(isLoading || videosLoading) && <BeatLoader color="blue" />}
    </div>
  );
};

export default memo(SearchVideoCard);