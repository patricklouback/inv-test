import React from 'react';

export function UploadIcon({ color = '#47009A' }: { color?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 12V3.85L4.4 6.45L3 5L8 0L13 5L11.6 6.45L9 3.85V12H7ZM0 16V11H2V14H14V11H16V16H0Z"
        fill={color}
      />
    </svg>
  );
}
