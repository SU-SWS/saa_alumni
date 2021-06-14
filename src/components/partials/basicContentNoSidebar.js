import React from "react";
import CreateBloks from "../../utilities/createBloks";
import RichTextRenderer from "../../utilities/richTextRenderer";
import WidthBox from "../layout/widthBox";

const BasicContentNoSidebar = ({ blok: { content, intro }, blok }) => (
  <WidthBox width="8" className="basic-page-content su-basefont-23 su-mx-auto su-rs-py-7">
    <RichTextRenderer
      wysiwyg={intro}
      className="su-text-m1 xl:su-text-m2 su-rs-mb-3"
    />
    <CreateBloks blokSection={content} />
  </WidthBox>
);

export default BasicContentNoSidebar;
