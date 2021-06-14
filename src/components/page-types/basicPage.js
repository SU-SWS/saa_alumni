import React from "react";
import SbEditable from "storyblok-react";
import { Container, Heading } from "decanter-react";
import Layout from "../partials/layout";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";
import BasicContentNoSidebar from "../partials/basicContentNoSidebar";

const BasicPage = (props) => {
  // Destructure.
  const {
    blok: {
      pageLayout,
      hero,
      aboveContent,
      content,
      belowContent,
      title,
      isSrOnlyTitle,
    },
    blok,
    hasHero,
  } = props;

  const numHero = getNumBloks(hero);
  const numAbove = getNumBloks(aboveContent);
  const numBelow = getNumBloks(belowContent);

  // Only add top padding to Main Content if the Above Content region is populated
  let contentTopPadding = "";

  if (numAbove > 0) {
    contentTopPadding = "su-rs-py-7";
  }

  return (
    <SbEditable content={blok}>
      <Layout hasHero={numHero > 0} {...props}>
        <Container
          element="main"
          id="main-content"
          className="basic-page su-relative su-flex-grow su-w-full"
          width="full"
        >
          <header>
            <CreateBloks blokSection={hero} />
            <Heading
              level={1}
              align="center"
              font="serif"
              srOnly={isSrOnlyTitle}
              id="page-title"
              className="su-cc su-mb-0 su-rs-py-7 su-text-m3 md:su-text-m5 lg:su-text-m6 su-mx-auto su-max-w-1200"
            >
              {title}
            </Heading>
          </header>
          {numAbove > 0 && (
            <div className="basic-page-above-content">
              <CreateBloks blokSection={aboveContent} />
            </div>
          )}
          {pageLayout === "no-sidebar" && (
            <BasicContentNoSidebar className={contentTopPadding} {...props} />
          )}
          {numBelow > 0 && (
            <div className="basic-page-below-content">
              <CreateBloks blokSection={belowContent} />
            </div>
          )}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default BasicPage;
