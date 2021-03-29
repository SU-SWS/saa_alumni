import React from "react";
import SbEditable from "storyblok-react";
import { smallPaddingBottom } from "../../utilities/dataSource";
import RichTextRenderer from "../../utilities/richTextRenderer";

const Wysiwyg = (props) => {
  let spacingBottom = smallPaddingBottom[props.blok.spacingBottom] ?? '';

  return (
    <SbEditable content={props.blok}>
      <div className={spacingBottom}>
        <RichTextRenderer wysiwyg={props.blok.content}/>
      </div>
    </SbEditable>
  )
}

export default Wysiwyg;
