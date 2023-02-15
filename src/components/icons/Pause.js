import React from "react";

const Pause = ({ height, width }) => {
  return (
    <div>
<svg height= {height ? height + 'px' : '30px'}
        width= {width ? width + 'px' : '30px'} viewBox="0 0 60 60" ><defs><style>
    </style></defs><path class="cls-1"fill= "#b5997a"
        fillRule= "evenodd" d="M240,930a30,30,0,1,1-30,30A30,30,0,0,1,240,930Zm-6.5,20h3a1.59,1.59,0,0,1,1.5,1.667v16.666A1.59,1.59,0,0,1,236.5,970h-3a1.59,1.59,0,0,1-1.5-1.667V951.667A1.59,1.59,0,0,1,233.5,950Zm10,0h3a1.59,1.59,0,0,1,1.5,1.667v16.666A1.59,1.59,0,0,1,246.5,970h-3a1.59,1.59,0,0,1-1.5-1.667V951.667A1.59,1.59,0,0,1,243.5,950Z" id="pause" transform="translate(-210 -930)"/></svg>
    </div>
  );
};

export default Pause;
