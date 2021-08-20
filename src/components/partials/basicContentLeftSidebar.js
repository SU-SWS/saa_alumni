import React from "react";
import { dcnb } from "cnbuilder";
import { Grid, GridCell } from "decanter-react";
import { render } from "storyblok-rich-text-react-renderer";
import CreateBloks from "../../utilities/createBloks";
import RichTextRenderer from "../../utilities/richTextRenderer";
import getNumBloks from "../../utilities/getNumBloks";

const BasicContentLeftSidebar = ({
  blok: { content, sidebar, intro, sectionMenu },
  className,
}) => {
  const renderedIntro = render(intro);
  const hasIntro = getNumBloks(renderedIntro) > 0;
  const hasContent = getNumBloks(content) > 0;
  const hasSidebar = getNumBloks(sidebar) > 0;
  const hasSectionMenu = getNumBloks(sectionMenu) > 0;

  if (!hasIntro && !hasContent && !hasSidebar && !hasSectionMenu) {
    return null;
  }

  return (
    <Grid xs={12} gap className={dcnb("su-cc", className)}>
      <GridCell
        xs={12}
        lg={4}
        xxl={3}
        className="basic-page-left-sidebar su-basefont-21 lg:su-ml-0 su-rs-mb-2"
      >
        {hasSectionMenu && (
          <CreateBloks
            id="section-menu-desktop"
            blokSection={sectionMenu}
            className="lg:su-block su-hidden lg:su-rs-mb-2"
          />
        )}
        <CreateBloks blokSection={sidebar} />
      </GridCell>
      <GridCell
        xs={12}
        lg={8}
        className="basic-page-main-content su-basefont-23 su-ml-0 2xl:su-col-start-5"
      >
        {hasIntro && (
          <RichTextRenderer
            wysiwyg={intro}
            className="su-text-m1 xl:su-text-m2 su-rs-mb-3"
          />
        )}
        <CreateBloks blokSection={content} />
      </GridCell>
    </Grid>
  );
};

export default BasicContentLeftSidebar;
