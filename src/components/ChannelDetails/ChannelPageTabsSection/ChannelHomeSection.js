import React, { useState, useEffect, useRef } from 'react';
import { GOOGLE_API_KEY, LATEST_VIDEOS_IN_A_CHANNEL, VIDEO_DETAILS } from '../../../utils/constantsAPI';
import '../index.css';
import { useSelector } from 'react-redux';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { formatViewCount, timeAgo } from '../../../Helpers/helper';

const ChannelHomeSection = ({ uploads }) => {
    const isNavOpen = useSelector((store) => store.nav.isMenuOpen);
    const [latestVideos, setLatestVideos] = useState([]);
    const scrollBarRef = useRef();

    const scrollLeft = () => {
        scrollBarRef.current.scrollLeft -= 900;
    };

    const scrollRight = () => {
        scrollBarRef.current.scrollLeft += 900;
    };

    const fetchVideoDetails = async (videoIds) => {
        try {
            const response = await fetch(`${VIDEO_DETAILS}${videoIds}&key=${GOOGLE_API_KEY}`);
            const data = await response.json();
            setLatestVideos(data.items);
            console.log('latestVideos:-', latestVideos)
        } catch (error) {
            console.error(error);
        }
    };

    const getLatestVideos = async () => {
        try {
            const response = await fetch(`${LATEST_VIDEOS_IN_A_CHANNEL}&playlistId=${uploads}&key=${GOOGLE_API_KEY}`);
            const data = await response.json();
            const videoIds = data.items.map(e => e.contentDetails.videoId).join(',');
            fetchVideoDetails(videoIds);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getLatestVideos();
    }, [uploads]);

    if (latestVideos.length === 0) return <h1 className='text-xl'>Loading.....</h1>;

    return (
        <div className='flex flex-col min-w-[868px] max-w-[100%] my-7'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-poppins font-bold'>For You</h1>
                <div className='gap-7 flex'>
                    <ArrowLeft onClick={scrollLeft} className='cursor-pointer' size={40} strokeWidth={0.5} />
                    <ArrowRight onClick={scrollRight} className='cursor-pointer' size={40} strokeWidth={0.5} />
                </div>
            </div>
            <div className='scroll-container-wrapper'>
                <div className='scrollContainer gap-7 flex-nowrap overflow-x-auto scroll-smooth' ref={scrollBarRef}>
                    {latestVideos.map((video) => (
                        <div className='video-box' key={video.id}>
                            <iframe
                                width="360"
                                height="220"
                                src={`https://www.youtube.com/embed/${video?.id}`}
                                title={video.snippet.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />

                            <h6 title={video?.snippet?.title} className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[360px]">{video?.snippet?.title}</h6>
                            <div className='flex gap-7'>
                                <p>{formatViewCount(video?.statistics?.viewCount)}</p>
                                <p>{timeAgo(video?.snippet?.publishedAt)}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChannelHomeSection;
