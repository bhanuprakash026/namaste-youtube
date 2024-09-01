import React, { useState, useEffect } from 'react'
import { GOOGLE_API_KEY, SHORTS_VIDEOS_IN_CHANNEL, VIDEO_DETAILS } from '../../../utils/constantsAPI';
import { formatViewCount, timeAgo } from '../../../Helpers/helper';
import '../../ChannelDetails/index.css'
import { Link } from 'react-router-dom';
// import useInfiniteScroll from '../../../Hooks/useInfiniteScroll';

const ChannelShortsSection = ({ uploads, channelId }) => {

  const [shortsVideos, setShortVideos] = useState([]);


  const fetchShortsVideoDetails = async (videoIds) => {
    try {
      const response = await fetch(`${VIDEO_DETAILS}${videoIds}&key=${GOOGLE_API_KEY}`);
      const data = await response.json();
      setShortVideos(data.items);
    } catch (error) {
      console.error(error);
    }
  }


  const getShortVideos = async () => {
    try {
      const data = await fetch(`${SHORTS_VIDEOS_IN_CHANNEL}&channelId=${channelId}`)
      const json = await data.json()
      const shortIds = json?.items?.map(e => e.id?.videoId).join(',');
      console.log('pageToken:--', json?.nextPageToken)
      fetchShortsVideoDetails(shortIds)
    } catch (error) {

    }
  }

  useEffect(() => {
    getShortVideos()
  }, [])

  // const {} = useInfiniteScroll()

  return (
    <div className='flex items-start flex-col mt-5'>

      <div className='flex gap-7 flex-wrap'>
        {shortsVideos?.map((video) => (
          <Link to={`/shorts/${video.id}`}>

            <div className='w-[250px] cursor-pointer relative h-auto' key={video.id}>
              <img
                className='w-full max-h-[720px] max-w-[405px] object-cover aspect-[83/151] rounded-lg'
                src={`${video.snippet?.thumbnails?.high?.url}?sqp=-oaymwEdCJUDENAFSFWQAgHyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLBlqNASOzrPwHJhr1y_Dc7IUb5iXA`}
                alt='thumbnail'
              />
              <h6 title={video?.snippet?.title} className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[360px]">{video?.snippet?.title}</h6>
              <div className='flex gap-7'>
                <p>{formatViewCount(video?.statistics?.viewCount)}</p>
                <p>{timeAgo(video?.snippet?.publishedAt)}</p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div >
  )
}

export default ChannelShortsSection