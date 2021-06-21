import React from "react";
import SbEditable from "storyblok-react";
import WidthBox from "../layout/widthBox";
import RichTextRenderer from "../../utilities/richTextRenderer";

const SimpleImage = ({
  blok: { image: { filename } = {}, imageWidth, caption, captionAlign },
  blok,
}) => (
  <SbEditable content={blok}>
    <WidthBox width={imageWidth}>
      <img src={filename} alt="" />
      {caption && (
        <RichTextRenderer
          wysiwyg={caption}
          className={`su-media__caption su-text-${captionAlign} ${
            imageWidth === "edge-to-edge" ? "centered-container" : ""
          }`}
        />
      )}
    </WidthBox>
  </SbEditable>
);

export default SimpleImage;
