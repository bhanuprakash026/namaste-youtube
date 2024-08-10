import React from 'react'
import './index.css'
import { Link } from 'react-router-dom';

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

const timeAgo = (timeString) => {
  const now = new Date()
  const past = new Date(timeString)
  // it will converts milliseconds to seconds
  const seconds = Math.floor((now - past) / 1000)

  let interval = Math.floor(seconds / 31536000) // seconds in year
  if (interval > 1) return `${interval} years ago`
  if (interval === 1) return `1 year ago`

  interval = Math.floor(seconds / 2592000) // seconds in Month
  if (interval > 1) return `${interval} months ago`
  if (interval === 1) return '1 month ago'

  interval = Math.floor(seconds / 86400) // seconds in a day
  if (interval > 1) return `${interval} days ago`
  if (interval === 1) return '1 day ago'

  interval = Math.floor(seconds / 3600)
  if (interval > 1) return `${interval} hours ago`
  if (interval === 1) return '1 hour ago'

  interval = Math.floor(seconds / 60)
  if (interval > 1) return `${interval} minutes ago`;
  if (interval === 1) return '1 minute ago';

  return 'Just now';
}


const SearchVideoCard = ({ videos }) => {
  return (
    <div className=''>
      {videos.map(video => (
        <Link to={`/watch?v=${video.id}`}>
          <div key={video.id} className="card-container">
            <div className='img-container'>
              <img className="image" src={video?.thumbnails.maxres?.url ?? video?.thumbnails.medium?.url} alt={video.title} />
            </div>
            <div className="des-wrapper">
              <h2 className='title-header'>{video?.title}</h2>
              <div className='flex gap-3'>
                <p className='views font-poppins'>{formatViewCount(video?.statistics?.viewCount)} Views</p>
                <p className='date'>{timeAgo(video?.publishedAt)}</p>
              </div>
              <p className='description'>{video?.description}</p>
              <Link to={`/channel/${video?.channelTitle}`}><p className='font-bold'>{video?.channelTitle}</p></Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SearchVideoCard