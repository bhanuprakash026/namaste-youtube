import React, { useState, useEffect } from 'react'
// import { VIDEOS_IN_CHANNEL } from '../../../utils/constantsAPI'
import '../../ChannelDetails/index.css'
import { formatViewCount, timeAgo } from '../../../Helpers/helper'
import { VIDEOS_IN_CHANNEL } from '../../../utils/constantsAPI'

const ChannelVideosSection = ({ uploads, channelId }) => {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const video = {
  //   "kind": "youtube#playlistItem",
  //   "etag": "BqWVD1YrGES721vtokk5KbWPLU8",
  //   "id": "VVVPSmxyTzl6bURZU2xJS3J3YlVnMWhRLk9HWU1YRWVsVEJz",
  //   "snippet": {
  //     "publishedAt": "2024-08-30T16:17:11Z",
  //     "channelId": "UCOJlrO9zmDYSlIKrwbUg1hQ",
  //     "title": "Pellivaramandi | S3 | Ep - 3 | Prasad Behara | Viraajitha | Telugu Web Series 2024 | Infinitum Media",
  //     "description": "Download FRND App: https://frndapp.onelink.me/Td7S/august2024romcom\n\nFor Brand Inquiries & Collaborations \nEmail us at brands@infinitumnetwork.in\n\n\"Pellivaramandi\" is a Telugu Romcom Web Series Featuring Prasad Behara & Viraajitha as Leads.\n\nCast: Prasad Behara, Viraajitha, Niharika Konidela, JDV Prasad, Swetha Ghattamaneni, Sunandhini, Mahindhar, Sri Kumari, Madan.\n\nProduced by Vandana Bandaru\n                       \nWritten and Directed by Prasad Behara\n\nBrands Manager: Bhargav.T \n\nDOP: Dinesh Paruchuri\n\nEditing: Chinna\n\nTitle Animation: Sai Baba\n\nPublicity Designer: Shiva Krishna, Nikhil Chotu.\n\nSound Engineer: Venkat, Bhaskar, Guru. \n\nLine Producer: Surya\n\nExecutive Producer: Chandu JC\n\n#Pellivaramandi #PrasadBehara #Viraajitha #InfinitumMedia #TeluguWebSeries2024 #CommitteeKurrollu\n\nFollow Prasad Behara on Instagram 👇👇👇\nhttps://instagram.com/prasad.behara?igshid=MzRlODBiNWFlZA==",
  //     "thumbnails": {
  //       "default": {
  //         "url": "https://i.ytimg.com/vi/OGYMXEelTBs/default.jpg",
  //         "width": 120,
  //         "height": 90
  //       },
  //       "medium": {
  //         "url": "https://i.ytimg.com/vi/OGYMXEelTBs/mqdefault.jpg",
  //         "width": 320,
  //         "height": 180
  //       },
  //       "high": {
  //         "url": "https://i.ytimg.com/vi/OGYMXEelTBs/hqdefault.jpg",
  //         "width": 480,
  //         "height": 360
  //       },
  //       "standard": {
  //         "url": "https://i.ytimg.com/vi/OGYMXEelTBs/sddefault.jpg",
  //         "width": 640,
  //         "height": 480
  //       },
  //       "maxres": {
  //         "url": "https://i.ytimg.com/vi/OGYMXEelTBs/maxresdefault.jpg",
  //         "width": 1280,
  //         "height": 720
  //       }
  //     },
  //     "channelTitle": "Infinitum RomCom",
  //     "playlistId": "UUOJlrO9zmDYSlIKrwbUg1hQ",
  //     "position": 0,
  //     "resourceId": {
  //       "kind": "youtube#video",
  //       "videoId": "OGYMXEelTBs"
  //     },
  //     "videoOwnerChannelTitle": "Infinitum RomCom",
  //     "videoOwnerChannelId": "UCOJlrO9zmDYSlIKrwbUg1hQ"
  //   }
  // }

  const getVideosInChannel = async () => {
    try {
      setIsLoading(true)
      const data = await fetch(`${VIDEOS_IN_CHANNEL}${uploads}`)
      const json = await data.json()
      setVideos(json?.items)
      setIsLoading(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getVideosInChannel()
  }, [])

  if (isLoading) {
    return <h1 className='text-xl font-bold'>Loading....</h1>
  }

  return (
    <div className='flex items-start flex-col mt-5'>
      <div className='flex gap-5 flex-wrap'>
        {videos.map((video) => (
          <div className='video-box' key={video.id}>
            <iframe
              width="400"
              height="220"
              src={`https://www.youtube.com/embed/${video?.snippet?.resourceId?.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

            <h6 title={video?.snippet?.title} className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[360px]">{video?.snippet?.title}</h6>
            <div className='flex'>
              <p>{timeAgo(video?.snippet?.publishedAt)}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default ChannelVideosSection