import React from "react";
import SbEditable from "storyblok-react";
import { Container, Heading } from "decanter-react";
import Layout from "../partials/layout";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";

const DarkPage = (props) => {
  // Destructure.
  const {
    blok: { hero, aboveContent, content, belowContent, title, isSrOnlyTitle },
    blok,
  } = props;

  const numHero = getNumBloks(hero);
  const numAbove = getNumBloks(aboveContent);
  const numContent = getNumBloks(content);
  const numBelow = getNumBloks(belowContent);

  return (
    <SbEditable content={blok}>
      <Layout hasHero={numHero > 0} isDark {...props}>
        <Container
          element="main"
          id="main-content"
          className="dark-page su-relative su-flex-grow su-w-full su-bg-saa-black su-text-white"
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
                className="su-max-w-900 su-mb-0 su-rs-py-7 su-text-m4 md:su-text-m5 lg:su-text-m6 su-mx-auto su-max-w-1200"
              >
                {title}
              </Heading>
            </Container>
          </header>
          {numAbove > 0 && (
            <div className="dark-page-above-content">
              <CreateBloks blokSection={aboveContent} />
            </div>
          )}
          {numContent > 0 && (
            <div className="dark-page-main-content">
              <CreateBloks blokSection={content} />
            </div>
          )}
          {numBelow > 0 && (
            <div className="dark-page-below-content">
              <CreateBloks blokSection={belowContent} />
            </div>
          )}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default DarkPage;
