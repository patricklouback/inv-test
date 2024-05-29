import React from 'react';

interface ItemProps {
  colors: '#67D1C4' | '#fff' | '#F6F6F8';
}


export const ItemStep: React.FC<ItemProps> = ({ colors }): JSX.Element => {
  const width = "198"
  const generatePath = (width):string => {
    const originalWidth = 138;
    const scale = width / originalWidth;
  
    const xMultiplier = (x: number):number => x * scale;
  
    const pathData = `
      M${xMultiplier(4)} 16
      C${xMultiplier(4)} 7.16344 ${xMultiplier(11.1634)} 0 ${xMultiplier(20)} 0
      H${xMultiplier(106.214)}
      C${xMultiplier(112.705)} 0 ${xMultiplier(118.552)} 3.921 ${xMultiplier(121.016)} 9.92552
      L${xMultiplier(132.507)} 37.9255
      C${xMultiplier(134.104)} 41.8177 ${xMultiplier(134.104)} 46.1823 ${xMultiplier(132.507)} 50.0745
      L${xMultiplier(121.016)} 78.0745
      C${xMultiplier(118.552)} 84.079 ${xMultiplier(112.705)} 88 ${xMultiplier(106.214)} 88
      H${xMultiplier(20)}
      C${xMultiplier(11.1634)} 88 ${xMultiplier(4)} 80.8366 ${xMultiplier(4)} 72
      V${xMultiplier(16)}Z
    `;
  
    return pathData;
  }
  return (
    <svg
      width={width}
      height="96"
      viewBox={`0 0 ${width} 96`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3032_3897)">
        <path
          d={generatePath(width)}
          fill={colors}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3032_3897"
          x="0"
          y="0"
          width={width}
          height="96"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3032_3897"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3032_3897"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
