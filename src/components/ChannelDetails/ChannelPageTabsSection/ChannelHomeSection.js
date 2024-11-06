import React, { useState, useEffect, useRef } from 'react';
import { LATEST_VIDEOS_IN_A_CHANNEL, POPULAR_VIDEOS_IN_CHANNEL, SHORTS_VIDEOS_IN_CHANNEL, VIDEO_DETAILS } from '../../../utils/constantsAPI';
import '../index.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { formatViewCount, timeAgo } from '../../../Helpers/helper';
import { Link } from 'react-router-dom';

const ChannelHomeSection = ({ uploads, channelId }) => {
    const [latestVideos, setLatestVideos] = useState([]);
    const [HomeShortVideos, setHomeShortVideos] = useState([])
    const [popularVideos, setPopularVideosIds] = useState([])
    const scrollBarRef = useRef();
    const scrollBarRefShorts = useRef();
    const scrollBarPopularVideos = useRef();

    const scrollLeft = () => {
        scrollBarRef.current.scrollLeft -= 900;
    };

    const scrollRight = () => {
        scrollBarRef.current.scrollLeft += 900;
    };

    const scrollLeftShorts = () => {
        scrollBarRefShorts.current.scrollLeft -= 900;
    };

    const scrollRightShorts = () => {
        scrollBarRefShorts.current.scrollLeft += 900;
    };

    const scrollLeftPopularVideos = () => {
        scrollBarPopularVideos.current.scrollLeft -= 900
    }

    const scrollRightPopularVideos = () => {
        scrollBarPopularVideos.current.scrollLeft += 900
    }

    const fetchVideoDetails = async (videoIds) => {
        try {
            const response = await fetch(`${VIDEO_DETAILS}${videoIds}&key=${process.env.REACT_APP_API_KEY}`);
            const data = await response.json();
            setLatestVideos(data.items);
        } catch (error) {
            console.error(error);
        }
    };

    const getLatestVideos = async () => {
        try {
            const response = await fetch(`${LATEST_VIDEOS_IN_A_CHANNEL}&playlistId=${uploads}&key=${process.env.REACT_APP_API_KEY}`);
            const data = await response.json();
            console.log('latestVideos Data:--', data)
            const videoIds = data?.items?.map(e => e.contentDetails.videoId).join(',');
            fetchVideoDetails(videoIds);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchShortsVideoDetails = async (videoIds) => {
        try {
            const response = await fetch(`${VIDEO_DETAILS}${videoIds}&key=${process.env.REACT_APP_API_KEY}`);
            const data = await response.json();
            setHomeShortVideos(data.items);
        } catch (error) {
            console.error(error);
        }
    }

    const getHomeShortVideos = async () => {
        try {
            const data = await fetch(`${SHORTS_VIDEOS_IN_CHANNEL}&channelId=${channelId}`)
            const json = await data.json()
            const shortIds = json?.items?.map(e => e.id?.videoId).join(',');
            console.log('Home Shorts Videos Data:--', json)
            console.log("shortIds:--", shortIds)
            fetchShortsVideoDetails(shortIds)
        } catch (error) {

        }
    }

    const fetchPopularVideos = async (popularVideoIds) => {
        try {
            const response = await fetch(`${VIDEO_DETAILS}${popularVideoIds}&key=${process.env.REACT_APP_API_KEY}`);
            const data = await response.json();
            setPopularVideosIds(data.items);
        } catch (error) {
            console.error(error);
        }
    }

    const getPopularVideos = async () => {
        try {
            const data = await fetch(`${POPULAR_VIDEOS_IN_CHANNEL}&channelId=${channelId}`)
            const json = await data.json()
            const popularVideoIds = json?.items?.map(e => e.id?.videoId).join(',');
            console.log('Home Shorts Videos Data:--', json)
            console.log("shortIds:--", popularVideoIds)
            fetchPopularVideos(popularVideoIds)
        } catch (error) {

        }
    }


    useEffect(() => {
        getLatestVideos();
        getHomeShortVideos();
        getPopularVideos()
    // eslint-disable-next-line
    }, [uploads, channelId]);

    if (latestVideos.length === 0) return <h1 className='text-xl'>Loading.....</h1>;

    return (
        <div className='flex flex-col min-w-[868px] max-w-[100%] my-7'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-poppins font-bold'>For You</h1>
                <div className='gap-7 flex'>
                    <ArrowLeft key='1001' onClick={scrollLeft} className='cursor-pointer' size={40} strokeWidth={0.5} />
                    <ArrowRight key='1002' onClick={scrollRight} className='cursor-pointer' size={40} strokeWidth={0.5} />
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
                            <Link to={`/watch?v=${video.id}`}>
                                <h6 title={video?.snippet?.title} className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[360px]">{video?.snippet?.title}</h6>
                                <div className='flex gap-7'>
                                    <p>{formatViewCount(video?.statistics?.viewCount)}</p>
                                    <p>{timeAgo(video?.snippet?.publishedAt)}</p>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>

            <hr className='mb-7' />

            <div className='flex justify-between'>
                <h1 className='text-2xl font-poppins flex items-center font-bold'><span><img className='w-[50px] h-[60px]' src="https://cdn.pixabay.com/photo/2021/05/05/12/16/shorts-png-6230962_1280.png" alt="shortIcon"/></span> Shorts</h1>
                <div className='gap-7 flex'>
                    <ArrowLeft key='1003' onClick={scrollLeftShorts} className='cursor-pointer' size={40} strokeWidth={0.5} />
                    <ArrowRight key='1004' onClick={scrollRightShorts} className='cursor-pointer' size={40} strokeWidth={0.5} />
                </div>
            </div>
            <div className='scroll-container-wrapper'>
                <div className='scrollContainer gap-7 flex-nowrap overflow-x-auto scroll-smooth' ref={scrollBarRefShorts}>
                    {HomeShortVideos?.map((video) => (
                        <Link to={`/shorts/${video.id}`} key={video.id}>
                            <div className='w-[200px] cursor-pointer relative h-auto' >
                                <img
                                    className='w-full max-h-[720px] max-w-[405px] object-cover aspect-[83/151] rounded-lg'
                                    src={`${video.snippet?.thumbnails?.high?.url}?sqp=-oaymwEdCJUDENAFSFWQAgHyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLBlqNASOzrPwHJhr1y_Dc7IUb5iXA`}
                                    alt='thumbnail'
                                />
                                <h6 title={video?.snippet?.title} className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[360px]">{video?.snippet?.title}</h6>
                                <div className='flex gap-7'>
                                    <p>{formatViewCount(video?.statistics?.viewCount)}</p>
                                    <p>{timeAgo(video?.snippet?.publishedAt)}</p>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <hr className='my-7' />

            <div className='flex justify-between'>
                <h1 className='text-2xl font-poppins font-bold'>Popular Videos</h1>
                <div className='gap-7 flex'>
                    <ArrowLeft key='1001' onClick={scrollLeftPopularVideos} className='cursor-pointer' size={40} strokeWidth={0.5} />
                    <ArrowRight key='1002' onClick={scrollRightPopularVideos} className='cursor-pointer' size={40} strokeWidth={0.5} />
                </div>
            </div>
            <div className='scroll-container-wrapper'>
                <div className='scrollContainer gap-7 flex-nowrap overflow-x-auto scroll-smooth' ref={scrollBarPopularVideos}>
                    {popularVideos?.map((video) => (
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
                            <Link to={`/watch?v=${video.id}`}>
                                <h6 title={video?.snippet?.title} className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[360px]">{video?.snippet?.title}</h6>
                                <div className='flex gap-7'>
                                    <p>{formatViewCount(video?.statistics?.viewCount)}</p>
                                    <p>{timeAgo(video?.snippet?.publishedAt)}</p>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default ChannelHomeSection;
