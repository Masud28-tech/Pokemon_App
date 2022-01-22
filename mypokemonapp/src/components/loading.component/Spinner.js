import React from 'react';
import loading from './DoubleRing.gif';

export const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading}
        style={{ width: "100px", height: "100px", margin: "10px"}}
        alt="loading..." />
    </div>
  )
};
