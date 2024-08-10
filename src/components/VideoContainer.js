import React, { useEffect, useState, useCallback, useRef } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constantsAPI";
import VideoCardContainer from "./VideoCardContainer";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState()
  const isOpen = useSelector((Store) => Store.nav.isMenuOpen)

  const observer = useRef();
  const lastVideoCardElement = useCallback((node) => {
    
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        if(nextPageToken != null || nextPageToken !== undefined ) fetchMoreVideos()
      }
    })
    if(node) observer.current.observe(node)
      // eslint-disable-next-line
  }, [isLoading, nextPageToken]);

  useEffect(() => {
    getVideos();
  }, []);

  const fetchMoreVideos = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(YOUTUBE_VIDEO_API + `&pageToken=${nextPageToken}`);
      const json = await data.json();
      setVideo((prevState) => [...prevState, ...json?.items]);
      setNextPageToken(json?.nextPageToken)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  const getVideos = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(YOUTUBE_VIDEO_API);
      const json = await data.json();
      setVideo((prevState) => [...prevState, ...json?.items]);
      setNextPageToken(json?.nextPageToken)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={isOpen ? "main-container" : "main-container-close"}>
      {videos?.map((video, index) => {
        if (videos?.length === index + 1) {
          return (
            <Link to={`watch?v=${video.id}`}>
              <div ref={lastVideoCardElement} key={video?.id}>
                <VideoCardContainer info={video} />
              </div>
            </Link>
          );
        } else {
          return (
            <Link to={`watch?v=${video.id}`}>
              <div key={video?.id}>
                <VideoCardContainer info={video} />
              </div>
            </Link>
          );
        }
      })}
      {isLoading && <BeatLoader color="blue" />}
    </div>
  );
};
export default VideoContainer;
