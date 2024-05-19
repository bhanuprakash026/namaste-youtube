import React from 'react'
import { useSelector } from 'react-redux'
// m-3 hover:scale-110 hover:transition hover:duration-500  ${isOpen ? "w-[430px]" : "w-[380px]"} flex-shrink flex-wrap}
const VideoCardContainer = ({ info }) => {
  
  const isOpen = useSelector((Store) => Store.nav.isMenuOpen)

  return (
    <div className={`${isOpen ? "video-card-container" : "video-card-container-close"}`}> 
      <img className={`rounded-xl ${isOpen ? "video-title"  : "video-title-close"}`} src={info?.snippet?.thumbnails?.medium?.url} alt="thumbnail" />
      <p className='video-title font-bold'>{info?.snippet?.title}</p>
      <p className='font-bold'>{info?.snippet?.channelTitle}</p>
      <p>{info?.statistics?.viewCount} Views</p>
    </div>
  )
}

export default VideoCardContainer
