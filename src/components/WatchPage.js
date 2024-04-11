import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { closeMenu } from '../redux/navSlice'

const WatchPage = () => {
  const [searchParam] = useSearchParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(closeMenu())
  }, [])

  return (
    <div>
      <iframe
        width="840px"
        height="520px"
        className='rounded-xl'
        src={`https://www.youtube.com/embed/${searchParam.get('v')}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen>

      </iframe>
    </div>
  )
}

export default WatchPage