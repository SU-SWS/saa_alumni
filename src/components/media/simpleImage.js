import React from "react";
import SbEditable from "storyblok-react";
import WidthBox from "../layout/widthBox";
import RichTextRenderer from "../../utilities/richTextRenderer";

const SimpleImage = ({
  blok: { image: { filename, alt } = {}, imageWidth, caption, captionAlign },
  blok,
}) => (
  <SbEditable content={blok}>
    <WidthBox width={imageWidth}>
      <figure>
        <img src={filename} alt={alt ?? ""} />
        {caption && (
          <figcaption>
            <RichTextRenderer
              wysiwyg={caption}
              className={`su-caption su-mt-06em children:su-leading-snug su-text-${captionAlign}`}
            />
          </figcaption>
        )}
      </figure>
    </WidthBox>
  </SbEditable>
);

export default SimpleImage;
