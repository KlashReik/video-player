import React from "react";

const VideoAsset = ({ asset }) => (
  <video
    controls
    draggable="false"
    style={{ width: "100%", height: "100%" }}
    onClick={(e) => e.preventDefault()}
  >
    <source src={asset.url} type="video/mp4" />
    <source src={asset.url} type="video/webm" />
  </video>
);

export default VideoAsset;
