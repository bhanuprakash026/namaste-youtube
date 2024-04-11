import React from 'react'
import { useSelector } from 'react-redux'

const VideoCardContainer = ({ info }) => {
  console.log(info, "Info prop")
  const isOpen = useSelector((Store) => Store.nav.isMenuOpen)

  return (
    <div className={`m-3 ${isOpen ? "w-[400px]" : "w-[350px]"} flex-shrink flex-wrap}`}>
      <img className='' src={info?.snippet?.thumbnails?.high?.url} alt="thumbnail" />
      <p className='font-bold start-0'>{info?.snippet?.title}</p>
      <p className='font-bold'>{info?.snippet?.channelTitle}</p>
      <p>{info?.statistics?.viewCount} Views</p>
    </div>
  )
}

export default VideoCardContainer
