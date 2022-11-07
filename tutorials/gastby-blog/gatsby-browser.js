import React from "react";
import "./src/styles/globals.css";
import "./src/styles/_variables.css";

export const wrapRootElement = ({ element }) => {
  return <React.Fragment>{element}</React.Fragment>;
};
