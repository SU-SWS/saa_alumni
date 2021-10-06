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
import { TripPageDetailsSection } from './TripPageDetailsSection';
import { TripPageSectionNav } from './TripPageSectionNav';
import { TripPageRelatedTripsSection } from './TripPageRelatedTripsSection';
import getNumBloks from '../../../utilities/getNumBloks';
import hasRichText from '../../../utilities/hasRichText';

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
      isCenterFacultyHeader,
      // Itinerary Section
      itineraryHeading,
      itineraryBody,
      itineraryAboveContent,
      itineraryBelowContent,
      itineraryItems,
      isCenterItineraryHeader,
      // Details Section
      detailsHeading,
      detailsBody,
      detailsBelowContent,
      isCenterDetailsHeader,
      // Related Trips,
      relatedTrips,
      // Ankle
      ankleContent,
    } = {},
  } = props;
  const printContainerRef = useRef(null);
  const printTrip = useReactToPrint({
    content: () => printContainerRef.current,
  });
  const renderFacultySection =
    facultyHeading ||
    hasRichText(facultyBody) ||
    getNumBloks(facultyBelowContent) > 0;
  const renderItinerarySection =
    itineraryHeading ||
    hasRichText(itineraryBody) ||
    getNumBloks(itineraryItems) > 0 ||
    getNumBloks(itineraryAboveContent) > 0 ||
    getNumBloks(itineraryBelowContent) > 0;
  const renderDetailsSection =
    detailsHeading ||
    hasRichText(detailsBody) ||
    getNumBloks(detailsBelowContent) > 0;

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
            {/* TODO: Trip Details sticky nav */}
            {/* <TripPageSectionNav
              facultyHeading={facultyHeading}
              itineraryHeading={itineraryHeading}
              detailsHeading={detailsHeading}
            /> */}
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
            {renderFacultySection && (
              <TripPageFacultySection
                facultyHeading={facultyHeading}
                facultyBody={facultyBody}
                facultyBelowContent={facultyBelowContent}
                isCenterFacultyHeader={isCenterFacultyHeader}
              />
            )}
            {/* Itinerary Section */}
            {renderItinerarySection && (
              <TripPageItinerarySection
                itineraryHeading={itineraryHeading}
                itineraryBody={itineraryBody}
                itineraryItems={itineraryItems}
                itineraryAboveContent={itineraryAboveContent}
                itineraryBelowContent={itineraryBelowContent}
                isCenterItineraryHeader={isCenterItineraryHeader}
              />
            )}
            {/* Details Section */}
            {renderDetailsSection && (
              <TripPageDetailsSection
                detailsHeading={detailsHeading}
                detailsBody={detailsBody}
                detailsBelowContent={detailsBelowContent}
                isCenterDetailsHeader={isCenterDetailsHeader}
              />
            )}
            {/* Related Trips */}
            {getNumBloks(relatedTrips) > 0 && (
              <TripPageRelatedTripsSection relatedTrips={relatedTrips} />
            )}
            {getNumBloks(ankleContent) > 0 && <Ankle isDark {...props} />}
          </Container>
        </div>
      </Layout>
    </SbEditable>
  );
};

export default TripPage;
