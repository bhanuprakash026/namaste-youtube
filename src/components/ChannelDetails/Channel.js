import React from 'react';
import { useParams } from 'react-router-dom';

function Channel() {
  const { channelId } = useParams();

  return (
    <div>
      <h1>Channel: {channelId}</h1>
      {/* Additional channel content here */}
    </div>
  );
}

export default Channel;
