import React from "react";
import SbEditable from "storyblok-react";
import { FlexBox, Heading } from "decanter-react";
import { dcnb } from "cnbuilder";
import RichTextRenderer from "../../utilities/richTextRenderer";

const ItineraryItem = ({ blok: { title, description, icon }, blok }) => {
  const iconStyle = "";

  return (
    <li>
      <Heading level={3} font="serif">
        {title}
      </Heading>
      <RichTextRenderer wysiwyg={description} />
    </li>
  );
};

export default ItineraryItem;
