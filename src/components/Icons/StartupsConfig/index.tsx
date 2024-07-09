import * as React from 'react';

export function ConfigIcon({ active }: { active: boolean }) {
  return (
    <svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38.5 9.167H33M25.208 5.5v7.333m-1.375-3.666H5.5M12.833 22H5.5m14.208-3.667v7.334M38.5 22H20.167M38.5 34.833H33m-7.792-3.666V38.5m-1.375-3.667H5.5"
        stroke={active ? '#47009A' : '#525556'}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
