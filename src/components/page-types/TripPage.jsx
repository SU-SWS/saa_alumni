import React from 'react';
import SbEditable from "storyblok-react";
import Layout from "../partials/layout";

const TripPage = (props) => {
  console.log('TripPage:', props.blok);

  return (
    <Layout hasHero {...props}>
      <div>TripPage</div>
    </Layout>
  );
};

export default TripPage;
