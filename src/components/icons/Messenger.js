import React from "react";

const Messenger = ({ height, width, clickContact }) => {
  return (
    <div onClick={clickContact}>
      {/* <svg
        height={height ? height + "px" : "30px"}
        width={width ? width + "px" : "30px"}
        viewBox="0 0 15 15"
        fill="#B3404A"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 7.19565C0 3.20099 3.37858 0 7.5 0C11.6214 0 15 3.20099 15 7.19565C15 11.1903 11.6214 14.3913 7.5 14.3913C6.54087 14.3913 5.62342 14.2175 4.77908 13.9024L2.5383 14.9527C2.36187 15.0354 2.15345 15.0081 2.00431 14.8827C1.85516 14.7573 1.79246 14.5567 1.84365 14.3687L2.36957 12.437C0.917685 11.1288 0 9.26893 0 7.19565ZM8.51642 8.63725L11.8202 5.88411L11.18 5.11589L8.48376 7.36275L6.5073 5.8804L2.70947 8.59313L3.29071 9.40687L6.49289 7.1196L8.51642 8.63725Z"
          fill="#B3404A"
        />
      </svg> */}
      <svg
        fill="#000000"
        height={height ? height + "px" : "30px"}
        width={width ? width + "px" : "30px"}
        viewBox="0 0 24 24"
        id="messenger"
        data-name="Flat Line"
        class="icon flat-line"
      >
        <path
          id="secondary"
          d="M20.88,13.46A9,9,0,0,1,7.88,20L3,21l1-4.88a9,9,0,1,1,16.88-2.66Z"
          fill="rgb(44, 169, 188)"
          strokeWidth="2"
        ></path>
        <polyline
          id="primary"
          points="16 11 13 13 11 11 8 13"
          fill="none"
          stroke="rgb(0, 0, 0)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></polyline>
        <path
          id="primary-2"
          data-name="primary"
          d="M20.88,13.46A9,9,0,0,1,7.88,20L3,21l1-4.88a9,9,0,1,1,16.88-2.66Z"
          fill="none"
          stroke="rgb(0, 0, 0)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    </div>
  );
};

export default Messenger;
