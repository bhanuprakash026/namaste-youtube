import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { closeMenu } from '../../redux/navSlice'
import CommentsContainer from './CommentsContainer'
import { channelDetailsAPI, COMMENTS_API, GOOGLE_API_KEY } from '../../utils/constantsAPI'
import LiveChat from '../LiveChat'
import SuggestionVideo from './SuggestionVideo'
import './WatchPage.css'
import { SUGGESTIONS_VIDEOS_API, VIDEO_DETAILS } from '../../utils/constantsAPI'
import VideoDescriptionContainer from './VideoDescriptionContainer'
import { BeatLoader } from 'react-spinners'


const WatchPage = () => {
  const [videoId, setVideoId] = useState('')
  const [videoDetails, setVideoDetails] = useState(null)
  const [channelData, setChannelData] = useState(null)
  const [hideVideoDescription, setHideVideoDescription] = useState(true)
  const [videoTitle, setVideoTitle] = useState('')
  const [suggestionsVideos, setSuggestionsVideos] = useState([])
  const [nextPageToken, setNextPageToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // comments part
  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setIsCommentLoading] = useState(false)
  const [commentsNextPageToken, setCommentsNextPageToken] = useState('')
  const dispatch = useDispatch()
  const [searchParam] = useSearchParams()
  const isOpen = useSelector((Store) => Store.nav.isMenuOpen)

  useEffect(() => {
    const newVideoId = searchParam.get('v')
    if (newVideoId && newVideoId !== videoId) {
      setVideoId(newVideoId)
    }
    // const channelData = await fetch(channelDetailsAPI + `${channelId}&key=${GOOGLE_API_KEY}`)
    // const channelDataJson = await channelData.json()

  }, [searchParam, videoId])

  const filterUniqueComment = (commentsArray) => {
    let uniqueComments = []
    let uniqueCommentId = new Set();

    commentsArray.forEach(comment => {
      if (!uniqueCommentId.has(comment.id)) {
        uniqueComments.push(comment)
        uniqueCommentId.add(comment.id)
      }
    });

    return uniqueComments
  }

  console.log("videoDetails:--", videoDetails)

  const fetchComments = async () => {
    try {
      setIsCommentLoading(true)
      const data = await fetch(COMMENTS_API + `${videoId}&textFormat=plainText&part=replies&maxResults=10&key=${GOOGLE_API_KEY}&pageToken=${commentsNextPageToken}`)
      const json = await data.json()
      setComments((prevState) => filterUniqueComment([...prevState, ...json?.items]))
      if (json?.nextPageToken) {
        setCommentsNextPageToken(json?.nextPageToken);
      }      setIsCommentLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  async function getSuggestionsVideos() {
    try {
      setIsLoading(true)
      const response = await fetch(`${SUGGESTIONS_VIDEOS_API}&q=${videoTitle}&maxResults=20`)
      const json = await response.json()
      setSuggestionsVideos(json.items)
      setNextPageToken(json.nextPageToken)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching suggestion videos:", error)
    }
  }

  async function getVideoDetails() {
    try {
      const data = await fetch(VIDEO_DETAILS + `${videoId}&key=${GOOGLE_API_KEY}`)
      const json = await data.json()
      const channelId = json?.items[0]?.snippet?.channelId
      const channelDetails = await fetch(channelDetailsAPI + `${channelId}&key=${GOOGLE_API_KEY}`)
      const channelDetailsJson = await channelDetails.json()
      setChannelData(channelDetailsJson)

      if (json.items && json.items.length > 0) {
        setVideoDetails(json)
        setVideoTitle(json.items[0]?.snippet?.title)
      } else {
        console.error("No video details found for the given video ID.")
      }
    } catch (error) {
      console.error("Error fetching video details:", error)
    }
  }


  useEffect(() => {
    dispatch(closeMenu())
    if (videoId) {
      setVideoDetails(null)
      setSuggestionsVideos([])
      setNextPageToken('')
      getVideoDetails()
      setCommentsNextPageToken('')
      setComments([])
    }

    if (videoTitle) {
      getSuggestionsVideos()
      fetchComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ videoId, videoTitle])


  const channelName = videoDetails?.items[0]?.snippet?.channelTitle.split(" ").join("")
  return (
    <div className={'watch-page-container'}>
      <div className={`${isOpen ? 'iFrame-comments-container-open' : "iFrame-comments-container-close"}`}>
        <iframe
          width="100%"
          height={`${isOpen ? "480px" : "530px"}`}
          className='rounded-xl'
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className='title-description-wrapper'>
          <div className='video-title-container'>
            <h1 className='font-bold text-left text-lg font-poppins my-3'>{videoDetails?.items[0]?.snippet?.title}</h1>
            <Link to={`/channel/${channelName}`}>
              <div className='text-left mb-2'>
                <img src='' alt='' />
                <div>
                  <h3>{videoDetails?.items[0]?.snippet?.channelTitle}</h3>
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
            <CommentsContainer videoId={videoId} comments={comments} isCommentsLoading={isCommentsLoading} firstNextPageToken={commentsNextPageToken} />
          </div>
        </div>
      </div>
      <div className='suggestions-container'>
        {videoDetails?.items[0]?.snippet?.hasOwnProperty("liveBroadcastContent") && videoDetails?.items[0]?.snippet?.liveBroadcastContent === "live" &&
          <div className='live-container'>
            <LiveChat />
          </div>
        }
        <SuggestionVideo videoId={videoId} isLoading={isLoading} suggestionsVideos={suggestionsVideos} firstSuggestionsVideosToken={nextPageToken} videoTitle={videoTitle} />
        {isLoading && <BeatLoader color='blue' />}
      </div>
    </div>
  )
}

export default WatchPage