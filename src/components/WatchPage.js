import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { closeMenu } from '../redux/navSlice'
import CommentsContainer from './CommentsContainer'
import LiveChat from './LiveChat'
import { GOOGLE_API_KEY, VIDEO_DETAILS } from '../utils/constantsAPI'

const WatchPage = () => {
  const [videoDetails, setVideoDetails] = useState()
  const [showVideoInfo, setShowVideoInfo] = useState(false)
  const [searchParam] = useSearchParams()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(closeMenu())
    getVideoDetails()


  }, []) // eslint ignore

  async function getVideoDetails() {
    const data = await fetch(VIDEO_DETAILS + `${searchParam.get('v')}&key=${GOOGLE_API_KEY}`)
    const json = await data.json()
    setVideoDetails(json)
  }
  // const {title, description} = videoDetails?.items[0]?.snippet

  return (
    <div className='watch-page-container'>
      <div className='video-live-chat-wrapper'>
        <div>
          <iframe
            width="840px"
            height="520px"
            className='rounded-xl'
            src={`https://www.youtube.com/embed/${searchParam.get('v')}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>

          </iframe>
        </div>

        {videoDetails?.items[0]?.snippet?.hasOwnProperty("liveBroadcastContent") && videoDetails?.items[0]?.snippet?.liveBroadcastContent === "live" && <div className='live-container'>
          <LiveChat />
        </div>}

      </div>

      <div className='video-info-container'>
        <h1 className='font-bold text-lg'>{videoDetails?.items[0]?.snippet?.title}</h1>
        {!videoDetails && <div className={showVideoInfo ? 'expand-video-description' : 'hide-video-description'}>
          <h5 className={showVideoInfo ? "" : 'video-des'}>{videoDetails?.items[0]?.snippet?.description}<span>...More</span></h5>
        </div>}
        {!videoDetails && <button className='bg-[#daddff] hover:bg-[#bbc0ff] rounded-2xl px-3 py-2 my-2 self-end text-[#423f3f]' onClick={() => setShowVideoInfo(!showVideoInfo)}>{showVideoInfo ? "Show less" : "Show More"}</button>}

      </div>
      <div className='my-5'>
        <CommentsContainer videoId={searchParam.get('v')} />
      </div>
    </div>
  )
}

export default WatchPage