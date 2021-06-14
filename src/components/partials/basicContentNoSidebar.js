import React from "react";
import { dcnb } from "cnbuilder";
import CreateBloks from "../../utilities/createBloks";
import RichTextRenderer from "../../utilities/richTextRenderer";
import WidthBox from "../layout/widthBox";

const BasicContentNoSidebar = ({
  blok: { content, intro },
  className,
}) => (
  <WidthBox
    width="8"
    className={dcnb("basic-page-main-content su-basefont-23 su-mx-auto", className)}
  >
    <RichTextRenderer
      wysiwyg={intro}
      className="su-text-m1 xl:su-text-m2 su-rs-mb-3"
    />
    <CreateBloks blokSection={content} />
  </WidthBox>
);

export default BasicContentNoSidebar;
