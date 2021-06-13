import React from "react";
import SbEditable from "storyblok-react";
import { Container, Heading } from "decanter-react";
import Layout from "../partials/layout";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";

const BasicPage = (props) => {
  // Destructure.
  const {
    blok: {
      hero,
      aboveContent,
      content,
      belowContent,
      title,
      isSrOnlyTitle,
      intro,
    },
    blok,
    hasHero,
  } = props;

  const numHero = getNumBloks(hero);
  const numAbove = getNumBloks(aboveContent);
  const numBelow = getNumBloks(belowContent);

  return (
    <SbEditable content={blok}>
      <Layout hasHero={numHero > 0} {...props}>
        <Container
          element="main"
          id="main-content"
          className="basic-page su-relative su-flex-grow su-w-full"
          width="full"
        >
          <CreateBloks blokSection={hero} />
          <Heading level={1} align="center" font="serif" srOnly={isSrOnlyTitle}>
            {title}
          </Heading>
          {numAbove > 0 && (
            <div id="basic-page-above-content">
              <CreateBloks blokSection={aboveContent} />
            </div>
          )}
          <div id="basic-page-content">
            <CreateBloks blokSection={content} />
          </div>
          {numBelow > 0 && (
            <div id="basic-page-below-content">
              <CreateBloks blokSection={belowContent} />
            </div>
          )}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default BasicPage;
