import React from "react";
import VideoAsset from "./VideoAsset/VideoAsset";
import ImageAsset from "./ImageAsset/ImageAsset";
import DeleteIcon from "../DeleteIcon/DeleteIcon";
import ResizeIcon from "../ResizeIcon/ResizeIcon";

export const Asset = ({
  asset,
  handleMouseDown,
  handleResizeStart,
  deleteAsset,
}) => {
  const renderContent = () => {
    if (asset.type === "video") {
      return <VideoAsset asset={asset} />;
    } else {
      return <ImageAsset url={asset.url} />;
    }
  };

  return (
    <div
      key={asset.id}
      style={{
        position: "absolute",
        left: asset.x,
        top: asset.y,
        width: asset.width,
        height: asset.height,
        cursor: "move",
      }}
      onMouseDown={(e) => handleMouseDown(e, asset.id)}
    >
      {renderContent()}
      <DeleteIcon assetId={asset.id} onDelete={deleteAsset} />

      <ResizeIcon
        handleResizeStart={(e) =>
          handleResizeStart(e, asset.id, asset.width, asset.height)
        }
      />
    </div>
  );
};
