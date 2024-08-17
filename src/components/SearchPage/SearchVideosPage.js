import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GOOGLE_API_KEY, searchAPI, VIDEO_DETAILS } from '../../utils/constantsAPI'
import SearchVideoCard from './SearchVideoCard'


const SearchVideosPage = () => {
  const [searchParam] = useSearchParams()
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const param = searchParam.get('search_query')

  async function fetchSearchResults() {
    try {
      setIsLoading(true)
      const data = await fetch(`${searchAPI}&q=${param}&maxResults=30`)
      const json = await data.json()
      setNextPageToken(json?.nextPageToken)
      const list = json.items?.map(item => item.id.videoId).join(',')
      fetchVideoDetails(list)
    } catch (error) {
      throw new Error(error);
    }
  }

  const fetchVideoDetails = (videoIds) => {
    try {
      fetch(`${VIDEO_DETAILS}${videoIds}&key=${GOOGLE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          const videoDetails = data.items.map(video => ({
            id: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnails: video.snippet.thumbnails,
            channelTitle: video.snippet.channelTitle,
            channelLink: `https://www.youtube.com/channel/${video.snippet.channelId}`,
            publishedAt: video.snippet.publishedAt,
            viewCount: video.statistics.viewCount,
          }));
          setIsLoading(false)
          setVideos(videoDetails);
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchSearchResults()
  }, [searchParam])

  return (
    <div>
      <SearchVideoCard videos={videos} initialPageToken={nextPageToken} isLoading={isLoading} />
    </div>
  )
}

export default SearchVideosPage