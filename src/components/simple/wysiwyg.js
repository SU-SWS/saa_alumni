import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import {
  smallPaddingBottom,
  smallPaddingTop,
} from "../../utilities/dataSource";
import RichTextRenderer from "../../utilities/richTextRenderer";
import WidthBox from "../layout/widthBox";

const Wysiwyg = ({
  blok: { content, width, spacingTop, spacingBottom, isLightText },
  blok,
}) => {
  const mySpacingTop = smallPaddingTop[spacingTop] ?? "";
  const mySpacingBottom = smallPaddingBottom[spacingBottom] ?? "";

  return (
    <SbEditable content={blok}>
      <WidthBox width={width} className={dcnb(mySpacingTop, mySpacingBottom)}>
        <RichTextRenderer
          isDark={isLightText}
          wysiwyg={content}
          className="su-heading-link-icon"
        />
      </WidthBox>
    </SbEditable>
  );
};

export default Wysiwyg;
