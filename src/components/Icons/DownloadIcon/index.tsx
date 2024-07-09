import React from 'react';

export function DownloadIcon({ color = '#47009A' }: { color?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 13V21H21V13" stroke={color} strokeWidth="2" />
      <path d="M12 2V11" stroke={color} strokeWidth="2" />
      <path d="M12 16L7.66987 10.75L16.3301 10.75L12 16Z" fill={color} />
    </svg>
  );
}
