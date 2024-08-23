import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import ChannelDetailsPopup from './ChannelDetailsPopup';
import { GOOGLE_API_KEY, channelDetailsAPI, channelIdByName } from '../../utils/constantsAPI';

function Channel() {
  const { channelName } = useParams();
  const [channelDetails, setChannelDetails] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatSubscribersCount = (count) => {
    if (count < 1000) {
      return count;
    } else if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(2) + 'K';
    } else if (count >= 1000000 && count < 10000000) {
      return (count / 1000000).toFixed(2) + 'M';
    } else if (count >= 10000000) {
      return (count / 1000000).toFixed(2) + 'M';
    } else {
      return count;
    }
  };

  const fetchChannelId = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`${channelIdByName}&q=${channelName}`);
      const json = await data.json();
      const channelId = json?.items[0]?.id?.channelId;
      const channelData = await fetch(channelDetailsAPI + `${channelId}&key=${GOOGLE_API_KEY}`);
      const channelDataJson = await channelData.json();
      setIsLoading(false);
      setChannelDetails(channelDataJson);
      console.log('channelDataJson:--', channelDataJson);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChannelId();
  }, []);

  return (
    <div className="page-container relative">
      {isLoading ? (
        <h1>Loading..</h1>
      ) : (
        <div>
          <div>
            <img
              className="rounded-3xl"
              src={`${channelDetails?.items[0]?.brandingSettings?.image?.bannerExternalUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
              alt="channelBanner"
            />
          </div>

          <div className="flex mt-5">
            <div>
              <img
                className="h-40 w-40 rounded-full"
                src={`${channelDetails?.items[0]?.snippet?.thumbnails?.high?.url}`}
              />
            </div>

            <div className="m-3 w-[50%] overflow-hidden text-start">
              <h1 className="text-3xl font-poppins font-bold mb-2 overflow-hidden">
                {channelDetails?.items[0]?.snippet?.localized.title}
              </h1>

              <div className='flex mb-2 gap-4'>
                <p className='text-lg font-poppins'>{channelDetails?.items[0]?.snippet?.title}</p>
                <p className='text-lg font-poppins'>{formatSubscribersCount(channelDetails?.items[0]?.statistics?.subscriberCount)} Subscribers</p>
                <p className='text-lg font-poppins'>{formatSubscribersCount(channelDetails?.items[0]?.statistics?.videoCount)}  Videos</p>
              </div>

              <div className="flex">
                <p onClick={() => setIsPopupOpen(!isPopupOpen)} title={channelDetails?.items[0]?.snippet?.localized.description} className="text-lg font-poppins cursor-pointer description">
                  {channelDetails?.items[0]?.snippet?.localized.description}
                </p>
                <button onClick={() => setIsPopupOpen(!isPopupOpen)} className="text-blue-500 font-poppins text-xl font-bold">
                  more
                </button>
              </div>
              {isPopupOpen && (
                <>
                  <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                  <ChannelDetailsPopup
                    description={channelDetails?.items[0]?.snippet?.localized.description}
                    onClose={() => setIsPopupOpen(false)}
                    subscribers={formatSubscribersCount(channelDetails?.items[0]?.statistics?.subscriberCount)} 
                    videoCount={channelDetails?.items[0]?.statistics?.videoCount}
                    totalViewsCount={channelDetails?.items[0]?.statistics?.viewCount}
                    joinedAt={channelDetails?.items[0]?.snippet?.publishedAt}
                    country={channelDetails?.items[0]?.brandingSettings?.channel?.country === "IN" ? 'India' : channelDetails?.items[0]?.brandingSettings?.channel?.country}
                  />
                </>
              )}


            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Channel;
