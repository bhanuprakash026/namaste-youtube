import React, { useEffect } from 'react'
import { openMenu } from '../redux/navSlice'
import { useDispatch } from 'react-redux'

const Channel = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(openMenu())
    // eslint-disable-next-line
  }, [])
  return (
    <div>Channel</div>
  )
}

export default Channel