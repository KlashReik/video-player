import React, { useReducer, useRef, useState } from "react";
import { assetReducer } from "../../assetsReducer";
import { URL_REGEX } from "../../constants";
import { getAssetDimensions, showAssetInfo } from "../../helpers";
import { Asset } from "../Asset/Asset";
import "./canvas.styles.css";

export const Canvas = () => {
  const [url, setUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [draggingAssetId, setDraggingAssetId] = useState(null);
  const [resizingAssetId, setResizingAssetId] = useState(null);

  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [initialAssetDimensions, setInitialAssetDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [assets, dispatch] = useReducer(assetReducer, []);

  const videosContainerRef = useRef(null);

  const deleteAsset = (assetId) => {
    dispatch({ type: "DELETE_ASSET", payload: assetId });
  };

  const addAsset = async () => {
    const trimmedUrl = url.trim();
    if (trimmedUrl && URL_REGEX.test(url)) {
      const type = trimmedUrl.match(/\.(mp4|webm)$/) ? "video" : "image";
      const dimensions = await getAssetDimensions(trimmedUrl, type);
      dispatch({
        type: "ADD_ASSET",
        payload: {
          id: Date.now(),
          url: trimmedUrl,
          type,
          x: 0,
          y: 0,
          width: dimensions.width,
          height: dimensions.height,
        },
      });
      setUrl("");
    } else {
      alert("You entered wrong url");
    }
  };

  const handleMouseDown = (e, assetId) => {
    setIsDragging(true);
    setDraggingAssetId(assetId);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleResizeStart = (e, assetId, width, height) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizingAssetId(assetId);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    setInitialAssetDimensions({ width, height });
  };

  const handleMouseMove = (e) => {
    if (isDragging && draggingAssetId) {
      const dx = e.clientX - initialMousePosition.x;
      const dy = e.clientY - initialMousePosition.y;

      dispatch({
        type: "UPDATE_ASSET",
        payload: {
          id: draggingAssetId,
          updateFunc: (asset) => ({
            x: asset.x + dx,
            y: asset.y + dy,
          }),
        },
      });

      setInitialMousePosition({ x: e.clientX, y: e.clientY });
    } else if (isResizing && resizingAssetId) {
      const dx = e.clientX - initialMousePosition.x;
      const dy = e.clientY - initialMousePosition.y;

      const newWidth = initialAssetDimensions.width + dx;
      const newHeight = initialAssetDimensions.height + dy;

      dispatch({
        type: "UPDATE_ASSET",
        payload: {
          id: resizingAssetId,
          updateFunc: () => ({
            width: newWidth,
            height: newHeight,
          }),
        },
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingAssetId(null);
    setIsResizing(false);
    setResizingAssetId(null);
  };

  const togglePlayPause = () => {
    if (videosContainerRef.current) {
      Array.from(videosContainerRef.current.querySelectorAll("video")).forEach(
        (video) => {
          if (isPlaying) {
            video.pause();
          } else {
            video.play();
          }
        }
      );
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <div className="control-menu">
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          placeholder="Enter URL for video or image"
        />
        <button onClick={addAsset}>Add Asset</button>
        <button onClick={() => showAssetInfo(assets)}>
          Log Asset Information
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"} All Videos
        </button>
      </div>
      <div
        ref={videosContainerRef}
        className="canvas-container"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {isResizing && <div className="resize-icon" />}
        {assets.map((asset) => (
          <Asset
            key={asset.id}
            asset={asset}
            handleMouseDown={handleMouseDown}
            handleResizeStart={handleResizeStart}
            deleteAsset={deleteAsset}
          />
        ))}
      </div>
    </div>
  );
};
