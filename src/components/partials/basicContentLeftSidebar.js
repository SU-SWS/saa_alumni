import React from "react";
import { dcnb } from "cnbuilder";
import { Grid, GridCell } from "decanter-react";
import CreateBloks from "../../utilities/createBloks";
import RichTextRenderer from "../../utilities/richTextRenderer";

const BasicContentLeftSidebar = ({
  blok: { content, sidebar, intro },
  className,
}) => (
  <Grid xs={12} gap className={dcnb("su-cc", className)}>
    <GridCell
      xs={12}
      lg={4}
      xxl={3}
      className="basic-page-left-sidebar su-basefont-21 su-mx-auto su-rs-mb-2"
    >
      <CreateBloks blokSection={sidebar} />
    </GridCell>
    <GridCell
      xs={12}
      lg={8}
      className="basic-page-main-content su-basefont-23 su-mx-auto 2xl:su-col-start-5"
    >
      <RichTextRenderer
        wysiwyg={intro}
        className="su-text-m1 xl:su-text-m2 su-rs-mb-3"
      />
      <CreateBloks blokSection={content} />
    </GridCell>
  </Grid>
);

export default BasicContentLeftSidebar;
