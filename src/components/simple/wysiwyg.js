import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import {
  smallPaddingBottom,
  smallPaddingTop,
} from "../../utilities/dataSource";
import RichTextRenderer from "../../utilities/richTextRenderer";

const Wysiwyg = ({
  blok: { content, spacingTop, spacingBottom, isLightText },
  blok,
}) => {
  const mySpacingTop = smallPaddingTop[spacingTop] ?? "";
  const mySpacingBottom = smallPaddingBottom[spacingBottom] ?? "";

  return (
    <SbEditable content={blok}>
      <div className={dcnb(mySpacingTop, mySpacingBottom)}>
        <RichTextRenderer
          isDark={isLightText}
          wysiwyg={content}
          className="su-heading-link-icon"
        />
      </div>
    </SbEditable>
  );
};

export default Wysiwyg;
