import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SHORT_VIDEOS, SHORT_VIDEO_DETAILS } from '../../utils/constantsAPI';
import { BeatLoader } from 'react-spinners';

const ShortsPage = () => {
    const [shortVideos, setShortVideos] = useState([]);
    const [pageToken, setNextPageToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [singleShortVideoDetails, setSingleShortVideoDetails] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchShortVideos = useCallback(async () => {

        try {
            setIsLoading(true);
            const data = await fetch(SHORT_VIDEOS);
            const json = await data.json();
            setNextPageToken(json?.nextPageToken);
            console.log('InitilaPageToken:--', json?.nextPageToken)
            setShortVideos(json?.items);
            setIsLoading(false);
        } catch (error) {
            alert(error);
            console.error('Error fetching video details:', error);
            setIsLoading(false);
        }
    }, [pageToken]);

    const fetchMoreShortVideos = async () => {
        console.log('calling this function fetchMoreShortVideos')
        try {
            setIsLoading(true)
            const data = await fetch(`${SHORT_VIDEOS}&pageToken=${pageToken}`)
            const json = await data.json()
            console.log('fetching more shortVideos:--', json)
            console.log('nextPageToken:--', json?.nextPageToken)
            setIsLoading(false)
            setNextPageToken(json?.nextPageToken)
            setShortVideos((prevState) => [...prevState, ...json?.items])
        } catch (error) {
            alert(error)
        }
    }

    const fetchSingleShortVideo = useCallback(async (videoId) => {
        try {
            const data = await fetch(`${SHORT_VIDEO_DETAILS}&id=${videoId}`);
            const json = await data.json();
            if (json?.items && json.items.length > 0) {
                setSingleShortVideoDetails(json.items[0]);
            } else {
                console.error('No items found in the response');
                setSingleShortVideoDetails(null);
            }
        } catch (error) {
            console.error('Error fetching video details:', error);
            setSingleShortVideoDetails(null);
        }
    }, []);

    useEffect(() => {
        if(id) navigate((`/shorts/${id}`));
        fetchShortVideos()

    }, []);

    useEffect(() => {
        if(window.location.pathname === '/shorts/:id'|| window.location.pathname === '/shorts/undefined') {
            navigate((`/shorts/${shortVideos[0]?.id?.videoId}`));
        } 
    }, [shortVideos])



    const setIndexUp = () => {
        console.log('Current Index:--', currentIndex)
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
            navigate((`/shorts/${shortVideos[currentIndex]?.id?.videoId}`));
        }
    };

    const setIndexDown = () => {
        console.log('Current Index:--', currentIndex)
        if (currentIndex < shortVideos.length - 1 && !isLoading) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            navigate((`/shorts/${shortVideos[currentIndex]?.id?.videoId}`));
        }
    };

    useEffect(() => {
        if (currentIndex === shortVideos.length - 1 && currentIndex !== 0) {
            console.log('Calling useEffect.')
            fetchMoreShortVideos()
        }
    }, [currentIndex])

    return (
        <div>
            <div className="flex items-center">
                {shortVideos?.map((video, index) =>
                    currentIndex === index ? (
                        <iframe
                            key={video?.id?.videoId}
                            className="rounded-2xl"
                            width="394"
                            height={700}
                            src={`https://www.youtube.com/embed/${id ? id : video?.id?.videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    ) : null
                )}
                <div className="flex flex-col">
                    <button onClick={setIndexUp}>⬆️</button>
                    <button onClick={setIndexDown} disabled={isLoading}>⬇️</button>
                </div>
            </div>
            {isLoading && <BeatLoader color="blue" />}
        </div>
    );

};

export default ShortsPage;

