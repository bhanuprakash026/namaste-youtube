import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { closeMenu } from '../../redux/navSlice'
import CommentsContainer from '../CommentsContainer'
import LiveChat from '../LiveChat'
import SuggestionVideo from './SuggestionVideo'
import './WatchPage.css'
import { GOOGLE_API_KEY, VIDEO_DETAILS } from '../../utils/constantsAPI'
// {`${isOpen ? 'mx-2 w-[25%] flex flex-col': 'mx-3 w-[35%] flex flex-col'}`}


const WatchPage = () => {
  const [videoDetails, setVideoDetails] = useState()
  const [showVideoInfo, setShowVideoInfo] = useState(false)
  const [searchParam] = useSearchParams()
  const dispatch = useDispatch()
  const isOpen = useSelector((Store) => Store.nav.isMenuOpen)



  useEffect(() => {
    dispatch(closeMenu())
    getVideoDetails()

    // eslint-disable-next-line
  }, [])

  async function getVideoDetails() {
    const data = await fetch(VIDEO_DETAILS + `${searchParam.get('v')}&key=${GOOGLE_API_KEY}`)
    const json = await data.json()
    setVideoDetails(json)
  }
  console.log(setVideoDetails)
  return (
    <div className='watch-page-container'>
      <div className={`${isOpen ? 'iFrame-comments-container-open' : "iFrame-comments-container-close"}`}>
        <div className='i-frame-container'>
          <iframe
            width="100%"
            height={`${isOpen ? "530px" : "590px"}`}
            className='rounded-xl'
            src={`https://www.youtube.com/embed/${searchParam.get('v')}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>

          </iframe>
        <h1>Video title goes here....</h1>
        </div>
      </div>

      <div className='suggestions-container'>
        {videoDetails?.items[0]?.snippet?.hasOwnProperty("liveBroadcastContent") && videoDetails?.items[0]?.snippet?.liveBroadcastContent === "live" &&
          <div className='live-container'>
            <LiveChat />
          </div>
        }
        <SuggestionVideo videoTitle={videoDetails?.items[0]?.snippet?.title} />
      </div>
    </div>


  )
}

export default WatchPage