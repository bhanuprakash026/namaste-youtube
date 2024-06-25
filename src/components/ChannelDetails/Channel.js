import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GOOGLE_API_KEY, channelDetailsAPI, channelIdByName } from '../../utils/constantsAPI';

function Channel() {
  const { channelName } = useParams();
  const [channelDetails, setChannelDetails] = useState()
  const [isLoading, setIsLoading] = useState(false)


  const fetchChannelId = async () => {
    try {
      setIsLoading(true)
      const data = await fetch(`${channelIdByName}&q=${channelName}`);
      const json = await data.json();
      const channelId = json?.items[0]?.id?.channelId
      const channelData = await fetch(channelDetailsAPI + `${channelId}&key=${GOOGLE_API_KEY}`)
      const channelDataJson = await channelData.json()
      setIsLoading(false)
      setChannelDetails(channelDataJson)

    } catch (error) {
      console.log(error)
    }




  };

  useEffect(() => {
    fetchChannelId()

    // disable-eslint-next-line
  }, [])


  return (
    <div>
      {isLoading ? <h1>Loading..</h1> : (
        <div className='flex-1 flex flex-col items-center'>
          <div className='w-[90%]'>
            <img src={`${channelDetails?.items[0]?.brandingSettings?.image?.bannerExternalUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`} alt='channelBanner' />
          </div>
        </div>
      )}
    </div>
  );
}

export default Channel;
