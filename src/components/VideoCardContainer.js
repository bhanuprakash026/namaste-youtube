import React from 'react'
import { useSelector } from 'react-redux'
// m-3 hover:scale-110 hover:transition hover:duration-500  ${isOpen ? "w-[430px]" : "w-[380px]"} flex-shrink flex-wrap}
const VideoCardContainer = ({ info }) => {
  
  const isOpen = useSelector((Store) => Store.nav.isMenuOpen)

  const formatViewCount = (count) => {
    if (count < 1000) {
      return count;
    } else if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1) + 'K';
    } else if (count >= 1000000 && count < 10000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 10000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else {
      return count;
    }
  };

  return (
    <div className={`${isOpen ? "video-card-container" : "video-card-container-close"} flex-1`}> 
      <img className={`rounded-xl ${isOpen ? "video-title"  : "video-title-close"}`} src={info?.snippet?.thumbnails?.medium?.url} alt="thumbnail" />
      <p className='video-title font-bold'>{info?.snippet?.title}</p>
      <p className='font-bold'>{info?.snippet?.channelTitle}</p>
      <p>{formatViewCount(info?.statistics?.viewCount)} Views</p>
    </div>
  )
}

export default VideoCardContainer
