import React from "react";

const Sentiment = ({ colorCode }) => {
  const circleStyle = {
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: colorCode,
    display: "inline-block",
    opacity: 0.7
  };

  return <div style={circleStyle} title="sentiment"></div>;
};

export default Sentiment;
