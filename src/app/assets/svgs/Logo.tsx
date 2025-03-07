import React from "react";

export default function Logo(){
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 60"
      fill="none"
      className="w-40 h-auto"
    >
      {/* Shopping Cart 'E' */}
      <g>
        <rect x="10" y="10" width="35" height="10" rx="5" fill="#0084ff" />
        <rect x="10" y="25" width="30" height="10" rx="5" fill="#0084ff" />
        <circle cx="15" cy="50" r="5" fill="#0084ff" />
        <circle cx="35" cy="50" r="5" fill="#0084ff" />
        <rect x="10" y="40" width="30" height="4" fill="#0084ff" />
      </g>
      
      {/* 'Mart' Text */}
      <text
        x="50"
        y="45"
        fontFamily="Arial, sans-serif"
        fontSize="32"
        fontWeight="semibold"
        fill="black"
      >
        Mart
      </text>
    </svg>
  );
};

