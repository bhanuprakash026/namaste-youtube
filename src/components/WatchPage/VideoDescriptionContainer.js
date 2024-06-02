import React from 'react'

const VideoDescriptionContainer = ({ toggleDes, videoDetails }) => {
  return (
    <>
      <div className={toggleDes ? 'font-poppins hide' : 'font-poppins open'}>
        {videoDetails?.items[0]?.snippet?.description.length > 0 && <p className='text-wrap whitespace-pre-line text-left'>{videoDetails?.items[0]?.snippet?.description}</p>}
      </div>
    </>
  )
}

export default VideoDescriptionContainer