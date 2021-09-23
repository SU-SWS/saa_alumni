import React from "react";
import { dcnb } from "cnbuilder";
import { borderColors, bgColors } from "../../utilities/dataSource";
import CardImage from "./cardImage";

const CircularImage = ({
  borderColor,
  filename = "",
  alt,
  className,
  smartFocus,
  loading,
  width,
  height,
  ...props
}) => {
  // Option to display image as round thumbnail with colored border
  const imageBorderColor = borderColors[borderColor ?? "digital-red"];
  const imageBgColor = bgColors[borderColor ?? "digital-red"];

  return (
    <div
      className={dcnb(
        "su-w-[12rem] su-h-[12rem] md:su-w-[14rem] md:su-h-[14rem] su-rounded-full su-border-[7px] su-border-solid su-overflow-hidden",
        imageBorderColor,
        imageBgColor,
        className
      )}
      aria-hidden={alt ? "false" : "true"}
      {...props}
    >
      <CardImage
        filename={filename}
        size="thumb"
        smartFocus={smartFocus}
        className="su-object-cover su-w-full su-h-full"
        loading={loading ?? "lazy"}
        alt={alt ?? ""}
        width={width}
        height={height}
      />
    </div>
  );
};

export default CircularImage;
