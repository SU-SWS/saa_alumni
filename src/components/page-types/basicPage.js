import React from "react";
import SbEditable from "storyblok-react";
import { Container, Heading } from "decanter-react";
import Layout from "../partials/layout";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";
import Ankle from "../partials/ankle";
import BasicContentNoSidebar from "../partials/basicContentNoSidebar";
import BasicContentLeftSidebar from "../partials/basicContentLeftSidebar";

const BasicPage = (props) => {
  // Destructure.
  const {
    blok: {
      pageLayout,
      title,
      isSrOnlyTitle,
      hero,
      aboveContent,
      belowContent,
      ankleContent,
    },
    blok,
  } = props;

  const numHero = getNumBloks(hero);
  const numAbove = getNumBloks(aboveContent);
  const numBelow = getNumBloks(belowContent);
  const numAnkle = getNumBloks(ankleContent);

  // Only add top padding to Main Content if the Above Content region is populated or if page title is visually hidden
  let contentPadding = "su-rs-pb-7";

  if (numAbove > 0 || isSrOnlyTitle) {
    contentPadding = "su-rs-py-7";
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
          <header className="su-basefont-23">
            <CreateBloks blokSection={hero} />
            <Container>
              <Heading
                level={1}
                align="center"
                font="serif"
                srOnly={isSrOnlyTitle}
                id="page-title"
                className="su-max-w-900 su-mb-0 su-rs-py-5 xl:su-rs-py-7 su-text-m4 md:su-text-m5 lg:su-text-m6 su-mx-auto su-max-w-1200"
              >
                {title}
              </Heading>
            </Container>
          </header>
          {numAbove > 0 && (
            <div className="basic-page-above-content">
              <CreateBloks blokSection={aboveContent} />
            </div>
          )}
          {pageLayout === "no-sidebar" && (
            <BasicContentNoSidebar className={contentPadding} {...props} />
          )}
          {pageLayout === "left-sidebar" && (
            <BasicContentLeftSidebar className={contentPadding} {...props} />
          )}
          {numBelow > 0 && (
            <div className="basic-page-below-content">
              <CreateBloks blokSection={belowContent} />
            </div>
          )}
          {numAnkle > 0 && <Ankle {...props} />}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default BasicPage;
