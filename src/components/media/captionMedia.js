import React from "react";
import { dcnb } from "cnbuilder";
import RichTextRenderer from "../../utilities/richTextRenderer";
import WidthBox from "../layout/widthBox";

const CaptionMedia = ({
  children,
  mediaWidth,
  caption,
  isInsetCaption,
  captionAlign,
  ...props
}) => {
  // Caption align is default to right-aligned
  let captionAlignStyles = "su-mr-0 su-ml-auto su-text-right";

  if (captionAlign === "left") {
    captionAlignStyles = "su-ml-0 su-mr-auto su-text-left";
  } else if (captionAlign === "center") {
    captionAlignStyles = "su-mx-auto su-text-center";
  }

  return (
    <WidthBox width={mediaWidth} {...props}>
      <figure>
        {children}
        {caption && (
          <figcaption className={isInsetCaption ? "su-cc" : ""}>
            <RichTextRenderer
              wysiwyg={caption}
              className={dcnb(
                "su-caption su-text-black-70 su-max-w-prose su-mt-08em children:su-leading-snug",
                captionAlignStyles
              )}
            />
          </figcaption>
        )}
      </figure>
    </WidthBox>
  );
};

export default CaptionMedia;
