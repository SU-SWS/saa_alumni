import React from 'react';
import { dcnb } from 'cnbuilder';
import SbEditable from 'storyblok-react';
import { Container } from 'decanter-react';
import Layout from '../../partials/layout';
import { TripPageHeroSection } from './TripPageHeroSection';
import { TripContent } from '../../../types/TripType';
import * as styles from './TripPage.styles';

export const TripPageProps = {
  blok: TripContent,
};

const TripPage = (props) => {
  const { blok, blok: { heroImage, title, subtitle, shortDescription } = {} } =
    props;

  return (
    <SbEditable content={blok}>
      <Layout hasHero {...props}>
        <Container
          element="main"
          id="main-content"
          className={dcnb('trip-page', styles.main)}
          width="full"
        >
          {/* Hero Section */}
          <TripPageHeroSection
            title={title}
            subtitle={subtitle}
            shortDescription={shortDescription}
            heroImage={heroImage}
          />
          {/* TODO: Overview Section */}
          {/* TODO: Faculty Section */}
          {/* TODO: Itinerary Section */}
          {/* TODO: Details Section */}
          {/* TODO: Related Trips */}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default TripPage;
