import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constantsAPI";
import VideoCardContainer from "./VideoCardContainer";
import { Link } from "react-router-dom";


const VideoContainer = () => {
  const [videos, setVideo] = useState([])

  useEffect(() => {
    getVideos()
  }, [])

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEO_API)
    const json = await data.json()
    setVideo(json)
  }

  return (
    <div className="flex justify-center flex-wrap">
      {videos?.items?.map((video) => (
        <Link to={`watch?v=${video.id}`}><VideoCardContainer key={video?.id} info={video} /></Link>
      ))}
    </div>
  )
}

export default VideoContainer