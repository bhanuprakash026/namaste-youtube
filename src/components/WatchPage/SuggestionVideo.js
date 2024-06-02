import React from 'react'
import { useState, useEffect } from 'react'
import './WatchPage'
import { SUGGESTIONS_VIDEOS_API } from '../../utils/constantsAPI';
import { BeatLoader } from 'react-spinners';

const SuggestionVideo = ({ videoTitle }) => {
  console.log("videoTitle",videoTitle)
  const [suggestionsVideos, setSuggestionVideos] = useState([])
  const [nextPageToken, setNextPageToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchInitialRenderVideos = async () => {

    try {
      setIsLoading(true)
      const data = await fetch(`${SUGGESTIONS_VIDEOS_API}&q=${videoTitle}&maxResults=20`)
      const json = await data.json()
      setIsLoading(false)
      setSuggestionVideos((prevState) => [...prevState, ...json?.items])
      setNextPageToken(json?.nextPageToken)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMoreData = async () => {

    try {
      setIsLoading(true)
      const data = await fetch(`${SUGGESTIONS_VIDEOS_API}&q=${videoTitle}&maxResults=05&pageToken=${nextPageToken}`)
      const json = await data.json()
      setIsLoading(false)
      setSuggestionVideos((prevState) => [...prevState, ...json?.items])
      setNextPageToken(json?.nextPageToken)
    } catch (error) {
      console.log(error)
    }
  }

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } =
      document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      fetchMoreData()
    }

  }

  useEffect(() => {
    if (suggestionsVideos.length === 0 && nextPageToken === null) fetchInitialRenderVideos()

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll);

    // eslint-disable-next-line
  }, [suggestionsVideos])



  return (
    <div>
      {isLoading ? <BeatLoader color='blue' /> : <div>
        {suggestionsVideos?.map((e, index) => (
          <div key={index} className='suggestion-list-container'>
            {/* Why component rendering 20 times.*/}
            {console.log("SuggestionVideo Component Rendered")}
            <img className='h-[120px]' src={e.snippet?.thumbnails?.medium?.url} alt={e.snippet?.title} />
            <div className='suggestion-list-description-container'>
              <p className='text-left text-ellipsis overflow-hidden'> {e.snippet?.title}</p>
              <p className='text-left text-ellipsis overflow-hidden'>{e.snippet?.description}</p>
            </div>
          </div>
        ))}
        {isLoading && <div className='h-[200px] w-[200px] flex flex-col justify-center items-center'><BeatLoader color="blue" /></div>}
      </div>}
      {console.log("SuggestionVideo Component rendered")}
    </div>
  )
}

export default SuggestionVideo