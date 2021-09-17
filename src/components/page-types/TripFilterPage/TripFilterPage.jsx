import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, Heading } from 'decanter-react';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import { useTripFilters } from '../../../hooks/useTripFilters';

const TripFilterPage = (props) => {
  const { blok } = props;
  const { hero } = blok;

  const data = useTripFilters();
  console.log('TripFilterPage', { blok, data });

  return (
    <SbEditable content={blok}>
      <Layout hasHero {...props}>
        <Container
          element="main"
          id="main-content"
          className="trip-filter-page su-relative su-flex-grow su-w-full"
          width="full"
        >
          <header className="su-basefont-23">
            <CreateBloks blokSection={hero} />
          </header>
          <div className="above-content todo" />
          <div className="filter-content">
          </div>
          <div className="below-content todo" />
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default TripFilterPage;
