import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import {
  smallPaddingBottom,
  smallPaddingTop,
  objectPosition,
} from "../../utilities/dataSource";
import transformImage from "../../utilities/transformImage";
import getImageWidth from "../../utilities/getImageWidth";
import CaptionMedia from "./captionMedia";

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
  const imageFocusPosition = objectPosition[imageFocus ?? "center"];

  let wrapperHeight = "";
  let imageStyle = "";
  let captionContainer = "";
  if (imageWidth === "edge-to-edge") {
    wrapperHeight = "su-relative su-w-full su-overflow-hidden";
    imageStyle = "su-h-full su-w-full su-object-cover";

    if (isBanner) {
      wrapperHeight = "su-h-[30vw] su-relative su-overflow-hidden";
    }

    if (isCaptionCenter) {
      captionContainer = "su-cc";
    }
  }

  let processedImg = "";
  if (filename != null) {
    let originalWidth = "";
    const imgWidth = getImageWidth(filename);

    // Get image width from URL of storyblok image
    if (filename?.startsWith("http")) {
      // eslint-disable-next-line prefer-destructuring
      originalWidth = filename.split("/")[5].split("x")[0];
    }

    if (imgWidth === "su-w-full" && originalWidth > 2000) {
      processedImg = transformImage(filename, "/2000x0");
    } else if (imgWidth === "centered-container" && originalWidth > 1500) {
      processedImg = transformImage(filename, "/1500x0");
    } else if (
      (imgWidth === "su-w-story" || imgWidth === "fit-container") &&
      originalWidth > 1000
    ) {
      processedImg = transformImage(filename, "/1000x0");
    } else if (imgWidth === "su-w-inset" && originalWidth > 700) {
      processedImg = transformImage(filename, "/700x0");
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
        captionClass={captionContainer}
        className={dcnb(spacingTopStyle, spacingBottomStyle)}
      >
        <div className={wrapperHeight}>
          <img
            src={processedImg}
            alt={alt ?? ""}
            className={dcnb("su-w-full", imageStyle, imageFocusPosition)}
          />
        </div>
      </CaptionMedia>
    </SbEditable>
  );
};

export default SimpleImage;
