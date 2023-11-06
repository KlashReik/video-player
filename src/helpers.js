export const getAssetDimensions = async (url, type) => {
  return new Promise((resolve) => {
    if (type === "image") {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        resolve({ width: img.width / 2, height: img.height / 2 });
      };
    } else {
      const video = document.createElement("video");
      video.src = url;
      video.onloadedmetadata = () => {
        resolve({
          width: video.videoWidth / 2,
          height: video.videoHeight / 2,
        });
      };
    }
  });
};

export const showAssetInfo = (assets) => {
  assets.forEach((asset) => {
    console.log(
      `Asset ID ${asset.id}: x=${asset.x}px, y=${asset.y}px, width=${asset.width}px, height=${asset.height}px`
    );
  });
};
