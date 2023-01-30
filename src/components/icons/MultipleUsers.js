import React from "react";

const MultipleUsers = ({ height, width }) => {
  return (
    <div>
      <svg
        height= {height ? height + 'px' : '30px'}
        width= {width ? width + 'px' : '30px'}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7.5 12C9.77817 12 11.625 10.1532 11.625 7.875C11.625 5.59683 9.77817 3.75 7.5 3.75C5.22183 3.75 3.375 5.59683 3.375 7.875C3.375 10.1532 5.22183 12 7.5 12Z"
          stroke="#000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.75 20.25C0.75 18.4598 1.46116 16.7429 2.72703 15.477C3.9929 14.2112 5.70979 13.5 7.5 13.5C9.29021 13.5 11.0071 14.2112 12.273 15.477C13.5305 16.7346 14.2407 18.4373 14.2499 20.2148"
          stroke="#000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.7266 13.5C19.5905 13.5 21.1016 11.989 21.1016 10.125C21.1016 8.26104 19.5905 6.75 17.7266 6.75C15.8626 6.75 14.3516 8.26104 14.3516 10.125C14.3516 11.989 15.8626 13.5 17.7266 13.5Z"
          stroke="#000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.8135 15.068C16.6486 14.7602 17.5456 14.6587 18.4284 14.7721C19.3111 14.8854 20.1534 15.2103 20.8836 15.7191C21.6139 16.2279 22.2104 16.9056 22.6225 17.6944C23.0297 18.4741 23.2449 19.3395 23.2504 20.2188"
          stroke="#000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default MultipleUsers;
