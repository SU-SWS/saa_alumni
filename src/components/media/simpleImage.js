import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import {
  smallPaddingBottom,
  smallPaddingTop,
} from "../../utilities/dataSource";
import transformImage from "../../utilities/transformImage";
import getImageWidth from "../../utilities/getImageWidth";
import CaptionMedia from "./captionMedia";
import FullWidthImage from "./fullWidthImage";

const SimpleImage = ({
  blok: {
    image: { filename, alt } = {},
    imageWidth,
    imageFocus,
    isBanner,
    caption,
    captionAlign,
    isCaptionCenter,
    spacingTop,
    spacingBottom,
  },
  blok,
}) => {
  const spacingTopStyle = smallPaddingTop[spacingTop];
  const spacingBottomStyle = smallPaddingBottom[spacingBottom];

  let wrapperHeight = "";
  let imageStyle = "";
  let isInsetCaption = "";
  if (imageWidth === "edge-to-edge") {
    wrapperHeight = "su-relative su-w-full su-overflow-hidden";
    imageStyle = "su-h-full su-w-full su-object-cover";

    if (isBanner) {
      wrapperHeight = "su-h-[30vw] su-relative su-overflow-hidden";
    }

    if (isCaptionCenter) {
      isInsetCaption = true;
    }
  }

  let processedImg = "";
  if (filename != null) {
    const originalWidth = getImageWidth(filename);

    if (imageWidth === "center-container" && originalWidth > 1500) {
      processedImg = transformImage(filename, "/1500x0");
    } else if (imageWidth === "10" && originalWidth > 1300) {
      processedImg = transformImage(filename, "/1300x0");
    } else if (imageWidth === "8" && originalWidth > 1000) {
      processedImg = transformImage(filename, "/1000x0");
    } else if (imageWidth === "6" && originalWidth > 800) {
      processedImg = transformImage(filename, "/800x0");
    } else if (imageWidth === "4" && originalWidth > 600) {
      processedImg = transformImage(filename, "/600x0");
    }
    // If no downsizing is needed, just run it through transformImage to reduce jpg quality to 60%
    else {
      processedImg = transformImage(filename, "");
    }
  }

  return (
    <SbEditable content={blok}>
      <CaptionMedia
        mediaWidth={imageWidth}
        caption={caption}
        captionAlign={captionAlign}
        className={dcnb(spacingTopStyle, spacingBottomStyle)}
        isInsetCaption={isInsetCaption}
      >
        <div className={wrapperHeight}>
          {imageWidth === "edge-to-edge" ? (
            <FullWidthImage
              filename={filename}
              className={dcnb("su-w-full", imageStyle)}
              alt={alt ?? ""}
              imageFocus={imageFocus}
            />
          ) : (
            <img src={processedImg} alt={alt ?? ""} className="su-w-full" />
          )}
        </div>
      </CaptionMedia>
    </SbEditable>
  );
};

export default SimpleImage;
