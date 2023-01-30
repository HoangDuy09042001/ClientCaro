import React from "react";

const Twitter = ({ height, width }) => {
  return (
    <div>
      <svg
        height= {height ? height + 'px' : '30px'}
        width= {width ? width + 'px' : '30px'}
        viewBox="0 0 24 24"
        id="Layer_1"
        data-name="Layer 1"
      >
        <path
          fill="none"
          stroke="#020202"
          strokeMiterlimit="10"
          strokeWidth="2px"
          class="cls-1"
          d="M8.5,17c-2.73-.52-4.33-1.56-5-3"
        />
        <path
          class="cls-1"
          d="M4.5,10c-1.15-1.92-1.7-5.38-1-6,3.1,2.5,6.12,4.09,9,4,0,0,0-5,4-5a4.38,4.38,0,0,1,3,1h3l-1,3a13.47,13.47,0,0,1-4,11c-5,5-13,4-16,0"
        />
        <path class="cls-1" d="M5.5,14a7.57,7.57,0,0,1-3-5" />
      </svg>
    </div>
  );
};

export default Twitter;
