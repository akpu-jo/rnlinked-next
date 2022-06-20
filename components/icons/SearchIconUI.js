import React from "react";

const SearchIconUI = ({ filled = false, ...props }) => {
  if (filled) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-"
        viewBox="0 0 20 20"
        fill="currentColor"
        {...props}
      >
        <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default SearchIconUI;
