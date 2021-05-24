import React from "react";
import { dcnb } from "cnbuilder";
import transformImage from "../../utilities/transformImage";
import getImageWidth from "../../utilities/getImageWidth";
import { objectPosition } from "../../utilities/dataSource";
import { borderColors } from "../../utilities/dataSource";

const CircularImage = ({
  borderColor,
  filename,
  className,
  imageFocus,
  loading,
  ...props
}) => {
  const imgFocus = objectPosition[imageFocus] ?? objectPosition.center;
  const imgLoading = loading ?? "auto";

  let originalImg = "";
  let imgSrc = "";

  if (filename != null) {
    let imgWidth = "";

    // Get image width from URL of storyblok image
    if (filename?.startsWith("http")) {
      imgWidth = getImageWidth(filename);
    }

    originalImg = transformImage(filename, "");

    if (imgWidth > 200) {
      imgSrc = transformImage(filename, "/200x0");
    } else {
      imgSrc = originalImg;
    }
  }

  // Option to display image as round thumbnail with colored border
  const imageBorderColor =
    borderColors[borderColor] ?? borderColors["digital-red"];

  return (
    <div
      className={dcnb(
        "su-w-[14rem] su-h-[14rem] su-rounded-full su-border-[7px] su-border-solid su-overflow-hidden",
        imageBorderColor,
        className
      )}
      aria-hidden="true"
    >
      <img
        src={imgSrc}
        className={dcnb("su-object-cover su-w-full su-h-full", imgFocus)}
        alt=""
        loading={imgLoading}
        {...props}
      />
    </div>
  );
};

export default CircularImage;
