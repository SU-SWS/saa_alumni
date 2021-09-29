import React, { useRef } from 'react';
import { dcnb } from 'cnbuilder';
import { useReactToPrint } from 'react-to-print';
import SbEditable from 'storyblok-react';
import { Container } from 'decanter-react';
import Layout from '../../partials/layout';
import { TripContent } from '../../../types/TripType';
import * as styles from './TripPage.styles';
import Ankle from '../../partials/ankle/ankle';

import { TripPageHeroSection } from './TripPageHeroSection';
import { TripPageOverviewSection } from './TripPageOverviewSection';
import { TripPageFacultySection } from './TripPageFacultySection';
import { TripPageItinerarySection } from './TripPageItinerarySection';

export const TripPageProps = {
  blok: TripContent,
};

const TripPage = (props) => {
  const {
    blok,
    blok: {
      // Hero Section
      heroImage,
      title,
      subtitle,
      shortDescription,
      // Overview Section
      overviewHeading,
      overviewBody,
      startDate,
      endDate,
      cost,
      durationText,
      inquireURL,
      reservationURL,
      overviewBelowContent,
      // Faculty
      facultyHeading,
      facultyBody,
      facultyBelowContent,
      // Itinerary Section
      itineraryHeading,
      itineraryBody,
      itineraryAboveContent,
      itineraryBelowContent,
      itineraryItems,
      // Ankle
      ankleContent,
    } = {},
  } = props;
  const printContainerRef = useRef(null);
  const printTrip = useReactToPrint({
    content: () => printContainerRef.current,
  });

  return (
    <SbEditable content={blok}>
      <Layout hasHero {...props}>
        <div ref={printContainerRef}>
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
            {/* Overview Section */}
            <TripPageOverviewSection
              overviewHeading={overviewHeading}
              overviewBody={overviewBody}
              startDate={startDate}
              endDate={endDate}
              cost={cost}
              durationText={durationText}
              inquireURL={inquireURL}
              reservationURL={reservationURL}
              overviewBelowContent={overviewBelowContent}
              onPrint={printTrip}
            />
            {/* Faculty Section */}
            <TripPageFacultySection
              facultyHeading={facultyHeading}
              facultyBody={facultyBody}
              facultyBelowContent={facultyBelowContent}
            />
            {/* Itinerary Section */}
            <TripPageItinerarySection
              itineraryHeading={itineraryHeading}
              itineraryBody={itineraryBody}
              itineraryItems={itineraryItems}
              itineraryAboveContent={itineraryAboveContent}
              itineraryBelowContent={itineraryBelowContent}
            />
            {/* TODO: Details Section */}
            {/* TODO: Related Trips */}
            {ankleContent && ankleContent.length > 0 && (
              <Ankle isDark {...props} />
            )}
          </Container>
        </div>
      </Layout>
    </SbEditable>
  );
};

export default TripPage;
