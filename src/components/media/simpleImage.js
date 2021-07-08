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
    isCaptionCenter,
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
              className={dcnb("su-w-full", imageStyle, imageFocusPosition)}
            />
          </div>
          {caption && (
            <figcaption>
              <RichTextRenderer
                wysiwyg={caption}
                className={dcnb(
                  "su-caption su-mt-06em children:su-leading-snug children:su-max-w-[70ch]",
                  captionAlignment,
                  captionContainer,
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
