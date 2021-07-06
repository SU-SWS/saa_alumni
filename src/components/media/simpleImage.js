import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import WidthBox from "../layout/widthBox";
import RichTextRenderer from "../../utilities/richTextRenderer";
import {
  smallPaddingBottom,
  smallPaddingTop,
  textAlign,
  objectPosition,
  containerAlign,
} from "../../utilities/dataSource";

const SimpleImage = ({
  blok: {
    image: { filename, alt } = {},
    imageWidth,
    imageFocus,
    isBanner,
    caption,
    captionAlign,
    spacingTop,
    spacingBottom,
  },
  blok,
}) => {
  const spacingTopStyle = smallPaddingTop[spacingTop];
  const spacingBottomStyle = smallPaddingBottom[spacingBottom];
  const captionAlignment = textAlign[captionAlign ?? "left"];
  const containerAlignment = containerAlign[captionAlign ?? "left"];
  const imageFocusPosition = objectPosition[imageFocus ?? "center"];

  let wrapperHeight = "";
  let imageStyle = "";
  if (imageWidth === "edge-to-edge" && isBanner) {
    wrapperHeight = "su-relative su-h-screen su-w-full su-overflow-hidden";
    imageStyle = "su-h-full su-w-full su-object-cover";
  }

  return (
    <SbEditable content={blok}>
      <WidthBox
        width={imageWidth}
        className={dcnb(spacingTopStyle, spacingBottomStyle)}
      >
        <figure>
          <div className={wrapperHeight}>
            <img
              src={filename}
              alt={alt ?? ""}
              className={dcnb(imageStyle, imageFocusPosition)}
            />
          </div>
          {caption && (
            <figcaption>
              <RichTextRenderer
                wysiwyg={caption}
                className={dcnb(
                  "su-caption su-mt-06em children:su-leading-snug children:su-max-w-[70ch]",
                  captionAlignment,
                  containerAlignment
                )}
              />
            </figcaption>
          )}
        </figure>
      </WidthBox>
    </SbEditable>
  );
};

export default SimpleImage;
