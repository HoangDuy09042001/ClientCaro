import React from "react";

const X = ({ height, width }) => {
  return (
    <div>
      <svg
        height= {height ? height + 'px' : '30px'}
        width= {width ? width + 'px' : '30px'}
        viewBox="0 0 48 48"
        fill="none"
      >
        <rect width="48" height="48" fill="white" fillOpacity="0.01" />
        <path
          d="M33 6H44L15 42H4L33 6Z"
          fill="#2F88FF"
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M15 6H4L33 42H44L15 6Z"
          fill="#2F88FF"
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default X;
