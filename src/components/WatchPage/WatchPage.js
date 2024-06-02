import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { closeMenu } from '../../redux/navSlice'
import CommentsContainer from './CommentsContainer'
import LiveChat from '../LiveChat'
import SuggestionVideo from './SuggestionVideo'
import './WatchPage.css'
import { GOOGLE_API_KEY, VIDEO_DETAILS } from '../../utils/constantsAPI'
import VideoDescriptionContainer from './VideoDescriptionContainer'


const WatchPage = () => {
  const [videoDetails, setVideoDetails] = useState()
  const [hideVideoDescription, setHideVideoDescription] = useState(true)
  const [videoTitle, setVideoTitle] = useState('')
  const dispatch = useDispatch()
  const [searchParam] = useSearchParams()
  const isOpen = useSelector((Store) => Store.nav.isMenuOpen)


  async function getVideoDetails() {
    try {
      const data = await fetch(VIDEO_DETAILS + `${searchParam.get('v')}&key=${GOOGLE_API_KEY}`)
      const json = await data.json()
      if (json.items && json.items.length > 0) {
        setVideoDetails(json)
        setVideoTitle(videoDetails?.items[0]?.snippet?.title)
      } else {
        console.error("No video details found for the given video ID.")
      }
    } catch (error) {
      console.error("Error fetching video details:", error)
    }
  }

  useEffect(() => {
    dispatch(closeMenu())
    getVideoDetails()

    // eslint-disable-next-line
  }, [videoDetails])

  return (
    
    <div className={isOpen ? 'open-watch-page-container' : 'watch-page-container'}>
      {console.log("WatchPage rendered")}
      <div className={`${isOpen ? 'iFrame-comments-container-open' : "iFrame-comments-container-close"}`}>
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

        <div className='title-description-wrapper'>
          <div className='video-title-container'>
            <h1 className='font-bold text-left text-lg font-poppins my-3'>{videoDetails?.items[0]?.snippet?.title}</h1>
            <Link to={`/@${videoDetails?.items[0]?.snippet?.channelTitle.split(" ").join("")}`}>

              <div className='text-left mb-2'>
                <img src='' alt='' />
                <div>
                  <h3>Dil Raju</h3>
                  <h4>5.54 Subscribers..</h4>
                </div>
              </div>
            </Link>
          </div>

          <div className='video-description'>
            <VideoDescriptionContainer toggleDes={hideVideoDescription} videoDetails={videoDetails} />
            <button className='self-end font-poppins font-bold' onClick={() => setHideVideoDescription(!hideVideoDescription)}>{hideVideoDescription ? "Show More" : 'Show less'}</button>
          </div>

          <div className='my-5'>
            <CommentsContainer videoId={searchParam.get('v')} />
          </div>
        </div>


      </div>

      <div className='suggestions-container'>
        {videoDetails?.items[0]?.snippet?.hasOwnProperty("liveBroadcastContent") && videoDetails?.items[0]?.snippet?.liveBroadcastContent === "live" &&
          <div className='live-container'>
            <LiveChat />
          </div>
        }
        {/* Here Why video details are undefined */}
        <SuggestionVideo videoTitle={videoTitle}/>
        {/* {videoDetails?.items[0]?.snippet?.title !== undefined && <SuggestionVideo videoTitle={videoDetails?.items[0]?.snippet?.title}/>} */}
      </div>
    </div>


  )
}

export default WatchPage