import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import ChannelDetailsPopup from './ChannelDetailsPopup';
import { channelDetailsAPI, channelIdByName } from '../../utils/constantsAPI';
import ChannelHomeSection from './ChannelPageTabsSection/ChannelHomeSection';
import ChannelVideosSection from './ChannelPageTabsSection/ChannelVideosSection';
import ChannelShortsSection from './ChannelPageTabsSection/ChannelShortsSection';

const tabsObject = [
  { id: 'HOME', text: 'Home' }, { id: 'VIDEOS', text: 'Videos' }, { id: 'SHORTS', text: 'Shorts' }
];

const Channel = () => {
  const { channelName } = useParams();
  const [channelDetails, setChannelDetails] = useState();
  const [channelId, setChannelId] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(tabsObject[0].id);

  const formatSubscribersCount = (count) => {
    if (count < 1000) return count;
    if (count >= 1000 && count < 1000000) return (count / 1000).toFixed(2) + 'K';
    if (count >= 1000000) return (count / 1000000).toFixed(2) + 'M';
    return count;
  };

  const fetchChannelId = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`${channelIdByName}&q=${channelName}`);
      const json = await data.json();
      const channelId = json?.items[0]?.id?.channelId;
      setChannelId(channelId);

      const channelData = await fetch(channelDetailsAPI + `${channelId}&key=${process.env.REACT_APP_API_KEY}`);
      const channelDataJson = await channelData.json();
      setChannelDetails(channelDataJson);
    } catch (error) {
      console.error("Error fetching channel details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [channelName]);

  useEffect(() => {
    fetchChannelId();
  }, [fetchChannelId]);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="overflow-hidden">
      <div className="flex justify-center">
        <img
          className="rounded-3xl flex-1"
          src={`${channelDetails?.items[0]?.brandingSettings?.image?.bannerExternalUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
          alt="channelBanner"
        />
      </div>

      <div className="flex mt-7">
        <div>
          <img
            className="h-40 w-40 rounded-full"
            src={`${channelDetails?.items[0]?.snippet?.thumbnails?.high?.url}`} alt="channelLogo"
          />
        </div>

        <div className="m-3 w-[50%] overflow-hidden text-start">
          <h1 className="text-3xl font-poppins font-bold mb-2 overflow-hidden">
            {channelDetails?.items[0]?.snippet?.localized.title}
          </h1>
          <div className="flex mb-2 gap-4">
            <p className="text-lg font-poppins">{channelDetails?.items[0]?.snippet?.title}</p>
            <p className="text-lg font-poppins">
              {formatSubscribersCount(channelDetails?.items[0]?.statistics?.subscriberCount)} Subscribers
            </p>
            <p className="text-lg font-poppins">
              {formatSubscribersCount(channelDetails?.items[0]?.statistics?.videoCount)} Videos
            </p>
          </div>
          <div className="flex">
            <p
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              className="w-[700px] text-lg font-poppins cursor-pointer text-left overflow-hidden text-ellipsis whitespace-nowrap"
            >
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
                country={
                  channelDetails?.items[0]?.brandingSettings?.channel?.country === "IN"
                    ? 'India'
                    : channelDetails?.items[0]?.brandingSettings?.channel?.country
                }
              />
            </>
          )}
        </div>
      </div>

      <div className="flex gap-10 mt-10 all-sections-wrapper">
        {tabsObject.map((eachTab, i) => (
          <div key={eachTab.id}>
            <button
              className={`text-xl font-poppins ${eachTab.id === activeTab ? 'font-bold pb-4 border-b-4 border-black' : ''}`}
              onClick={() => setActiveTab(tabsObject[i].id)}
            >
              {eachTab.text}
            </button>
          </div>
        ))}
      </div>

      <hr />

      {activeTab === 'HOME' && (
        <div className="overflow-hidden">
          <ChannelHomeSection uploads={channelDetails?.items[0]?.contentDetails?.relatedPlaylists?.uploads} channelId={channelId} />
        </div>
      )}
      {activeTab === 'VIDEOS' && (
        <div className="overflow-hidden">
          <ChannelVideosSection uploads={channelDetails?.items[0]?.contentDetails?.relatedPlaylists?.uploads} channelId={channelId} />
        </div>
      )}
      {activeTab === 'SHORTS' && (
        <div className="overflow-hidden">
          <ChannelShortsSection uploads={channelDetails?.items[0]?.contentDetails?.relatedPlaylists?.uploads} channelId={channelId} />
        </div>
      )}
    </div>
  );
};

export default Channel;
