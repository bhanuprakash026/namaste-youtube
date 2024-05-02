import React from 'react'

const SingleCommentContainer = ({ imgURL, authorDisplayName, commentText }) => {
  return (
    <div className='comment-container'>
      <img className='img round rounded-full' src={imgURL} alt="" />
      <div className='comment-content-wrapper'>
        <h5>{authorDisplayName}</h5>
        <h6>{commentText}</h6>
      </div>

    </div>
  )
}

export default SingleCommentContainer