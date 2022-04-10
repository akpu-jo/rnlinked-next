import React from "react";

export const NavOptions = ({ children, dec, ...props }) => {
  return (
    <li className={dec} {...props}>
      {children}
    </li>
  );
};