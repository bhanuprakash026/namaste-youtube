import { UserRound } from 'lucide-react'
import React from 'react'

const LiveChatMessage = ({ name, message }) => {
  return (
    <div className='my-1 w-full flex p-1 bg-white items-center round rounded-lg'>
      <UserRound color='gray' size={20} />
      <div className='flex ml-3 items-start'>
        <span className='font-bold'>{name}</span>
        <span className='ml-2'>{message}</span>
      </div>
    </div>
  )
}

export default LiveChatMessage