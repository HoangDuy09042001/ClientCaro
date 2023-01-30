import React from "react";

const Confirm = ({ height, width }) => {
  return (
    <div>
      <svg
        fill="#000000"
        height= {height ? height + 'px' : '30px'}
        width= {width ? width + 'px' : '30px'}
        version="1.1"
        id="Layer_1"
        viewBox="0 0 492 492"
      >
        <g>
          <g>
            <path
              d="M484.088,292.46c-5.1-5.128-11.968-8.076-19.156-8.076l0.172,0.036H330.588c-14.832,0-26.864,12.308-26.864,27.132v22.788
			c0,7.16,2.784,13.908,7.88,19c5.088,5.092,11.836,7.9,18.992,7.9l39.088,0.004c-32.072,34.348-76.7,53.888-123.708,53.888
			c-93.256,0-169.132-75.876-169.132-169.132S152.716,76.868,245.972,76.868c69.824,0,133.388,43.836,158.172,109.084
			c5.636,14.82,20.076,24.784,35.924,24.784c4.66,0,9.248-0.852,13.636-2.52c19.808-7.52,29.796-29.76,22.268-49.568
			C439.932,63.772,347.504,0.024,245.976,0.024C110.344,0.024,0,110.368,0,246s110.184,245.976,245.816,245.976
			c62.608,0,123.232-24.64,169.336-67.9v21.796c0,14.832,12.392,26.824,27.22,26.824h22.792c14.828,0,26.836-11.992,26.836-26.824
			V311.648C492,304.468,489.204,297.548,484.088,292.46z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M361.06,179.392l-11.068-11.072c-2.86-2.86-6.676-4.436-10.744-4.436s-7.884,1.58-10.736,4.436L221.228,275.604
			l-64.792-64.792c-2.86-2.86-6.676-4.436-10.736-4.436c-4.068,0-7.88,1.58-10.74,4.436l-11.08,11.068
			c-5.912,5.92-5.912,15.56,0,21.48l86.612,86.604c2.856,2.856,6.668,4.432,10.736,4.432s7.88-1.58,10.812-4.512l129.02-129.02
			C366.984,194.944,366.984,185.312,361.06,179.392z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Confirm;
