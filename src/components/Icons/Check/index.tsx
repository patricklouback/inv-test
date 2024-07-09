import * as React from 'react';

interface CheckMarkProps {
  size?: number;
}

export function CheckMark({ size = 48, ...props }: CheckMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 48a24 24 0 100-48 24 24 0 000 48zm-.619-14.293l13.334-16-4.096-3.414-11.467 13.758-5.933-5.936-3.771 3.77 8 8 2.064 2.064 1.87-2.242z"
        fill="#28B446"
      />
    </svg>
  );
}
