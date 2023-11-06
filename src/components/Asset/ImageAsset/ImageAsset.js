import React from "react";

const ImageAsset = ({ url }) => (
  <img
    src={url}
    alt="Asset"
    style={{ width: "100%", height: "100%" }}
    draggable={false}
  />
);

export default ImageAsset;
