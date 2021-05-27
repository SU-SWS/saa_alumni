import React from "react";
import SbEditable from "storyblok-react";
import { Container } from "decanter-react";
import Layout from "../partials/layout";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";

const LandingPage = (props) => {
  // Destructure.
  const {
    blok: { content, hero },
    blok,
    hasHero,
  } = props;

  const numHero = getNumBloks(hero);

  return (
    <SbEditable content={blok}>
      <Layout hasHero={numHero > 0} {...props}>
        <Container
          element="main"
          id="main-content"
          className="landing-page su-relative su-flex-grow su-w-full"
          width="full"
        >
          <CreateBloks blokSection={hero} />
          <div id="body-content">
            <CreateBloks blokSection={content} />
          </div>
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default LandingPage;
