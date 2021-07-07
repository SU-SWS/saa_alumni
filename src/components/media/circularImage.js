import React from "react";
import { dcnb } from "cnbuilder";
import { borderColors, bgColors } from "../../utilities/dataSource";
import CardImage from "./cardImage";

const CircularImage = ({
  borderColor,
  filename = "",
  alt,
  className,
  imageFocus,
  loading,
  ...props
}) => {
  // Option to display image as round thumbnail with colored border
  const imageBorderColor = borderColors[borderColor ?? "digital-red"];
  const imageBgColor = bgColors[borderColor ?? "digital-red"];

  return (
    <div
      className={dcnb(
        "su-w-[14rem] su-h-[14rem] su-rounded-full su-border-[7px] su-border-solid su-overflow-hidden",
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
        imageFocus={imageFocus}
        className="su-object-cover su-w-full su-h-full"
        loading={loading ?? "lazy"}
        alt={alt ?? ""}
      />
    </div>
  );
};

export default CircularImage;
