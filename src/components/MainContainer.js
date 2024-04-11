import React from "react";
import ButtonsList from "./ButtonsList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div className="overflow-x-auto w-screen">
      <ButtonsList />
      <VideoContainer />
    </div>
  );
}

export default MainContainer;