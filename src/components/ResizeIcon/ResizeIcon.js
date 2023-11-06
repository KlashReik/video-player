import React from "react";
import "./resizeIcon.styles.css";

const ResizeIcon = ({ handleResizeStart }) => (
  <div
    className="resize-square"
    onMouseDown={(e) => handleResizeStart(e)}
  ></div>
);

export default ResizeIcon;
