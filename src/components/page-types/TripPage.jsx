import React from "react";
import SbEditable from "storyblok-react";
import { Container } from "decanter-react";
import Layout from "../partials/layout";

const TripPage = (props) => {
  const { blok } = props;

  return (
    <SbEditable content={blok}>
      <Layout hasHero {...props}>
        <Container
          element="main"
          id="main-content"
          className="trip-page su-relative su-flex-grow su-w-full"
          width="full"
        >
          {/* Trip Page bloks here */}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default TripPage;
