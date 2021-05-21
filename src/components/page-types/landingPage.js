import React from "react";
import SbEditable from "storyblok-react";
import { Container } from "decanter-react";
import Layout from "../partials/layout";
import CreateBloks from "../../utilities/createBloks";

const LandingPage = (props) => {
  // Destructure.
  const {
    blok: { content, hero },
    blok,
  } = props;

  return (
    <SbEditable content={blok}>
      <Layout {...props}>
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
