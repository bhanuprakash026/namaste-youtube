import React from 'react';
import { useParams } from 'react-router-dom';

function Channel() {
  const { id } = useParams();

  return (
    <div>
      <h1>Channel: {id}</h1>
      {/* Additional channel content here */}
    </div>
  );
}

export default Channel;
