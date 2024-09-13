import React, { useState, useEffect } from 'react'
import { GOOGLE_API_KEY, SHORTS_VIDEOS_IN_CHANNEL, VIDEO_DETAILS } from '../../../utils/constantsAPI';
import { formatViewCount, timeAgo } from '../../../Helpers/helper';
import '../../ChannelDetails/index.css'
import { Link } from 'react-router-dom';
import useInfiniteScroll from '../../../Hooks/useInfiniteScroll';
import { BeatLoader } from 'react-spinners';
// import useInfiniteScroll from '../../../Hooks/useInfiniteScroll';

const ChannelShortsSection = ({ uploads, channelId }) => {

  const [shortsVideos, setShortVideos] = useState([]);
  const [pageToken, setPageToken] = useState('')


  const fetchShortsVideoDetails = async (videoIds) => {
    try {
      const response = await fetch(`${VIDEO_DETAILS}${videoIds}&key=${GOOGLE_API_KEY}`);
      const data = await response.json();
      setShortVideos((prevState) => [...prevState, ...data?.items]);
    } catch (error) {
      console.error(error);
    }
  }


  const getShortVideos = async () => {
    try {
      const data = await fetch(`${SHORTS_VIDEOS_IN_CHANNEL}&channelId=${channelId}`)
      const json = await data.json()
      console.log('pageToken of channel short videos:--', json?.nextPageToken)
      setPageToken(json?.nextPageToken)
      const shortIds = json?.items?.map(e => e.id?.videoId).join(',');
      fetchShortsVideoDetails(shortIds)
    } catch (error) {

    }
  }

  useEffect(() => {
    getShortVideos()
  }, [])

  const { data, lastElementRef, loading, currentJson, nextPageToken } = useInfiniteScroll(`${SHORTS_VIDEOS_IN_CHANNEL}&channelId=${channelId}`, shortsVideos, pageToken)

  useEffect(() => {
    if (currentJson?.items) {
      console.log("currentJson?.items:--", currentJson?.items)
      const shortIds = currentJson?.items?.map(e => e.id?.videoId).join(',');
      console.log('cuurent short videos Ids:--', shortIds)
      fetchShortsVideoDetails(shortIds)
      setPageToken(nextPageToken)
    }
  }, [currentJson])

  // const {} = useInfiniteScroll()

  return (
    <div className='flex items-start flex-col mt-5'>

      <div className='flex gap-7 flex-wrap'>

        {shortsVideos?.map((video, index) => (
          <React.Fragment key={video.id}>
            <Link to={`/shorts/${video.id}`}>
              <div className='w-[250px] cursor-pointer relative h-auto' ref={index === shortsVideos.length - 1 ? lastElementRef : null}>
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
          </React.Fragment>
        ))}
        {loading && <BeatLoader color='blue' />}
      </div>
    </div >
  )
}

export default ChannelShortsSection