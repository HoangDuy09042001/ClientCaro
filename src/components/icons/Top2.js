import React from "react";

const Banner = ({ height, width }) => {
  return (
    <div>
      <svg
        height= {height ? height + 'px' : '30px'}
        width= {width ? width + 'px' : '30px'}
        viewBox="-3.44 0 63 63"
      >
        <g id="Group_81" dataName="Group 81" transform="translate(-462 -735)">
          <path
            id="Rectangle_72"
            dataName="Rectangle 72"
            d="M0,0H34a0,0,0,0,1,0,0V24A17,17,0,0,1,17,41h0A17,17,0,0,1,0,24V0A0,0,0,0,1,0,0Z"
            transform="translate(473 736)"
            fill="#fff1b6"
            stroke="#333"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <line
            id="Line_128"
            dataName="Line 128"
            x2="34"
            transform="translate(473 741)"
            fill="#ffffff"
            stroke="#333"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <line
            id="Line_129"
            dataName="Line 129"
            x1="46"
            transform="translate(467 797)"
            fill="#ffffff"
            stroke="#333"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            id="Line_130"
            dataName="Line 130"
            y2="14"
            transform="translate(490 777)"
            fill="#ffffff"
            stroke="#333"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            id="Path_111"
            dataName="Path 111"
            d="M504,797H476l4-6h20Z"
            fill="#fff1b6"
            stroke="#333"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            id="Path_112"
            dataName="Path 112"
            d="M490,749.659l2.253,4.566,5.039.732-3.646,3.554.861,5.018L490,761.161l-4.507,2.369.861-5.018-3.646-3.554,5.039-.732Z"
            fill="#ffc2c2"
            stroke="#333"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            id="Path_113"
            dataName="Path 113"
            d="M473,761a10,10,0,0,1,0-20"
            fill="none"
            stroke="#333"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            id="Path_114"
            dataName="Path 114"
            d="M507.125,761a10,10,0,0,0,0-20"
            fill="none"
            stroke="#333"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};

export default Banner;
