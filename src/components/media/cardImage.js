import React from "react";
import { dcnb } from "cnbuilder";
import transformImage from "../../utilities/transformImage";
import getImageWidth from "../../utilities/getImageWidth";
import { objectPosition } from "../../utilities/dataSource";

const CardImage = ({
  filename,
  alt,
  size,
  className,
  imageFocus,
  smartFocus,
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

    originalImg = transformImage(filename, "", smartFocus, true);

    if (size === "vertical" && imgWidth > 800) {
      imgSrc = transformImage(filename, "/800x0", smartFocus);
    } else if (size === "thumb" && imgWidth > 200) {
      imgSrc = transformImage(filename, "/200x200", smartFocus, true);
    } else if (size === "horizontal" && imgWidth > 1200) {
      imgSrc = transformImage(filename, "/1200x0", smartFocus);
    } else if (size === "medium_2x1" && imgWidth > 800) {
      imgSrc = transformImage(filename, "/800x400", smartFocus, true);
    } else {
      imgSrc = originalImg;
    }
  }

  return (
    <img
      src={imgSrc}
      className={dcnb("su-object-cover", className, imgFocus)}
      alt={alt ?? ""}
      loading={imgLoading}
      {...props}
    />
  );
};

export default CardImage;
