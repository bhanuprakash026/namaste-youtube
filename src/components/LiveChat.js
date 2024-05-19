import React, { useEffect } from 'react'
import LiveChatMessage from './LiveChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../redux/liveChatSlice'
import generateRandomMessage from '../Helpers/helper'

const LiveChat = () => {
  const dispatch = useDispatch()
  const liveChatMessages = useSelector(store => store.liveChat.messages)

  useEffect(() => {
    const i = setInterval(() => {

      dispatch(
        addMessage({
          name: "Akshay Saini",
          message: generateRandomMessage(20) +" 🙏"
        })
      )
    }, 500)

    return ( )=> clearInterval(i)

  }, [])
  return (
    <div className='h-[520px] mb-3 ml-4 flex flex-col-reverse items-start p-5 round rounded-2xl border border-[#cdcdcd] overflow-y-auto '>
      {liveChatMessages.map((c, i) => (
        <LiveChatMessage key={i} name={c.name} message={c.message}/>
      ))}
    </div>
  )
}

export default LiveChat