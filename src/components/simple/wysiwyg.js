import React from "react";
import SbEditable from "storyblok-react";
import { smallPaddingBottom } from "../../utilities/dataSource";
import RichTextRenderer from "../../utilities/richTextRenderer";

const Wysiwyg = ({ blok: { spacingBottom, content }, blok }) => {
  const mySpacingBottom = smallPaddingBottom[spacingBottom] ?? "";

  return (
    <SbEditable content={blok}>
      <div className={mySpacingBottom}>
        <RichTextRenderer wysiwyg={content} />
      </div>
    </SbEditable>
  );
};

export default Wysiwyg;
