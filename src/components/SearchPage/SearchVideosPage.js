import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GOOGLE_API_KEY, searchAPI, VIDEO_DETAILS } from '../../utils/constantsAPI'
import SearchVideoCard from './SearchVideoCard'


const SearchVideosPage = () => {
    const [searchParam] = useSearchParams()
    const [videos, setVideos] = useState([]);
    const param = searchParam.get('search_query')

    async function fetchSearchResults() {
        const data = await fetch(`${searchAPI}&q=${param}&maxResults=30`)
        const json = await data.json()
        const list = json.items?.map(item => item.id.videoId).join(',')
        const channelIdsList = json.items?.map(item => item.snippet?.channelId).join(',')
        console.log(channelIdsList)
        fetchVideoDetails(list)
    }

    const fetchVideoDetails = (videoIds) => {
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
            console.log("videoDetails:--", videoDetails)
            setVideos(videoDetails);
          });
      };

    useEffect(() => {
        fetchSearchResults()
    }, [searchParam])

    return (
        <div>
            <SearchVideoCard videos={videos} />
        </div>
    )
}

export default SearchVideosPage