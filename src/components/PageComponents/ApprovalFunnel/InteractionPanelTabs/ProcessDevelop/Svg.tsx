import React from 'react';

export const SvgWallpaper: React.FC = (): JSX.Element => {
  return (
    <svg
      width="117"
      height="96"
      viewBox="0 0 138 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2782_3477)">
        <path
          d="M4 16C4 7.16344 11.1634 0 20 0H106.214C112.705 0 118.552 3.921 121.016 9.92552L132.507 37.9255C134.104 41.8177 134.104 46.1823 132.507 50.0745L121.016 78.0745C118.552 84.079 112.705 88 106.214 88H20C11.1634 88 4 80.8366 4 72V16Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2782_3477"
          x="0"
          y="0"
          width="137.705"
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
            result="effect1_dropShadow_2782_3477"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2782_3477"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
