import React from "react";
import { dcnb } from "cnbuilder";
import { Grid, GridCell, Skiplink } from "decanter-react";
import { render } from "storyblok-rich-text-react-renderer";
import CreateBloks from "../../utilities/createBloks";
import RichTextRenderer from "../../utilities/richTextRenderer";
import getNumBloks from "../../utilities/getNumBloks";

const BasicContentLeftSidebar = ({
  blok: { content, sidebar, intro, sectionMenu },
  location,
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
        className="basic-page-left-sidebar su-basefont-21 lg:su-ml-0 su-rs-mb-2 su-hidden lg:su-block"
      >
        <Skiplink anchorLink="#page-content" className="su-hidden lg:su-block">
          Skip pass sidebar to page content
        </Skiplink>
        {hasSectionMenu && (
          <CreateBloks
            id="section-menu-desktop"
            blokSection={sectionMenu}
            pageLink={location?.pathname}
            className="lg:su-block su-hidden lg:su-rs-mb-2"
          />
        )}
        {hasSidebar && (
          <div className="su-hidden lg:su-block">
            <CreateBloks blokSection={sidebar} />
          </div>
        )}
      </GridCell>
      <GridCell
        xs={12}
        lg={8}
        className="basic-page-main-content su-basefont-23 su-ml-0 2xl:su-col-start-5"
        id="page-content"
      >
        {hasIntro && (
          <RichTextRenderer
            wysiwyg={intro}
            className="su-text-m1 xl:su-text-m2 su-rs-mb-3"
          />
        )}
        <CreateBloks blokSection={content} />
        <div className="lg:su-hidden su-rs-mt-5">
          <CreateBloks blokSection={sidebar} />
        </div>
      </GridCell>
    </Grid>
  );
};

export default BasicContentLeftSidebar;
