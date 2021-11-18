import React, { useRef, useMemo } from 'react';
import { dcnb } from 'cnbuilder';
import { useReactToPrint } from 'react-to-print';
import SbEditable from 'storyblok-react';
import { Alert } from 'decanter-react';
import useScrollSpy from 'react-use-scrollspy';
import { luxonDate, luxonToday } from '../../../utilities/dates';
import Layout from '../../partials/layout';
import { TripContent } from '../../../types/TripType';
import * as styles from './TripPage.styles';
import Ankle from '../../partials/ankle/ankle';
import getNumBloks from '../../../utilities/getNumBloks';
import hasRichText from '../../../utilities/hasRichText';

import { TripPageHeroSection } from './TripPageHeroSection';
import { TripPageOverviewSection } from './TripPageOverviewSection';
import { TripPageFacultySection } from './TripPageFacultySection';
import { TripPageItinerarySection } from './TripPageItinerarySection';
import { TripPageExtensionSection } from './TripPageExtensionSection';
import { TripPageDetailsSection } from './TripPageDetailsSection';
import { TripPagePricingSection } from './TripPagePricingSection';
import { TripPageSectionNav } from './TripPageSectionNav';
import { TripPageRelatedTripsSection } from './TripPageRelatedTripsSection';

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
      tripSize,
      minAge,
      status,
      inquireURL,
      reservationURL,
      overviewBelowContent,
      // Faculty
      hideFacultySection,
      facultyHeading,
      facultyBody,
      facultyBelowContent,
      isCenterFacultyHeader,
      // Itinerary Section
      hideItinerarySection,
      itineraryHeading,
      itineraryBody,
      itineraryAboveContent,
      itineraryItems,
      isCenterItineraryHeader,
      // Trip Extension Section
      hideExtensionSection,
      extendHeading,
      extendIntro,
      extendBody,
      extendStartDate,
      extendEndDate,
      extendPrice,
      extendTripSize,
      extendAboveContent,
      extendItinerary,
      isCenterExtendHeader,
      // Details Section
      hideDetailsSection,
      detailsHeading,
      detailsBody,
      detailsBelowContent,
      isCenterDetailsHeader,
      // Pricing Section,
      hidePricingSection,
      pricingHeading,
      pricingBody,
      pricingBelowContent,
      isCenterPricingHeader,
      // Related Trips,
      hideRelatedTrips,
      relatedTrips,
      // Ankle
      ankleContent,
    } = {},
  } = props;
  const hasTripStarted = useMemo(() => {
    const start = luxonDate(startDate);
    return luxonToday() > start;
  }, [startDate]);

  const printContainerRef = useRef(null);
  const printTrip = useReactToPrint({
    content: () => printContainerRef.current,
  });

  // Check whether each of the sections have content
  const renderFacultySection =
    !hideFacultySection &&
    (facultyHeading !== '' ||
      hasRichText(facultyBody) ||
      getNumBloks(facultyBelowContent) > 0);
  const renderItinerarySection =
    !hideItinerarySection &&
    (itineraryHeading !== '' ||
      hasRichText(itineraryBody) ||
      getNumBloks(itineraryItems) > 0 ||
      getNumBloks(itineraryAboveContent) > 0);
  const renderExtensionSection =
    !hideExtensionSection &&
    (extendHeading !== '' ||
      hasRichText(extendIntro) ||
      hasRichText(extendBody) ||
      getNumBloks(extendItinerary) > 0);
  const renderDetailsSection =
    !hideDetailsSection &&
    (detailsHeading !== '' ||
      hasRichText(detailsBody) ||
      getNumBloks(detailsBelowContent) > 0);
  const renderPricingSection =
    !hidePricingSection &&
    (pricingHeading !== '' ||
      hasRichText(pricingBody) ||
      getNumBloks(pricingBelowContent) > 0);
  const renderRelatedTrips = !hideRelatedTrips && getNumBloks(relatedTrips) > 0;

  // For implementing scrollspy for the section nav
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const activeSection = useScrollSpy({
    sectionElementRefs: sectionRefs,
    offsetPx: -200,
  });

  return (
    <SbEditable content={blok}>
      {hasTripStarted && (
        <Alert type="warning" label="Warning:" hasDismiss={false}>
          <p className={styles.startAlert}>
            We missed you! This trip is no longer available for booking.
          </p>
        </Alert>
      )}
      <Layout hasHero {...props}>
        <main
          id="main-content"
          className={dcnb('trip-page', styles.main)}
          ref={printContainerRef}
        >
          {/* Hero Section */}
          <TripPageHeroSection
            title={title}
            subtitle={subtitle}
            shortDescription={shortDescription}
            heroImage={heroImage}
            ref={sectionRefs[0]}
          />
          {!hasTripStarted && (
            <>
              {/* Trip Section Sticky Nav */}
              {(renderFacultySection ||
                renderItinerarySection ||
                renderDetailsSection ||
                renderPricingSection) && (
                <TripPageSectionNav
                  renderFacultySection={renderFacultySection}
                  renderItinerarySection={renderItinerarySection}
                  renderDetailsSection={renderDetailsSection}
                  renderPricingSection={renderPricingSection}
                  status={status}
                  inquireURL={inquireURL}
                  reservationURL={reservationURL}
                  activeSection={activeSection}
                  ariaLabel="Section Menu"
                />
              )}
              {/* Overview Section */}
              <TripPageOverviewSection
                overviewHeading={overviewHeading}
                overviewBody={overviewBody}
                startDate={startDate}
                endDate={endDate}
                cost={cost}
                tripSize={tripSize}
                minAge={minAge}
                status={status}
                inquireURL={inquireURL}
                reservationURL={reservationURL}
                overviewBelowContent={overviewBelowContent}
                onPrint={printTrip}
                ref={sectionRefs[1]}
              />
              {/* Faculty Section */}
              {renderFacultySection && (
                <TripPageFacultySection
                  facultyHeading={facultyHeading}
                  facultyBody={facultyBody}
                  facultyBelowContent={facultyBelowContent}
                  isCenterFacultyHeader={isCenterFacultyHeader}
                  ref={sectionRefs[2]}
                />
              )}
              {/* Itinerary Section */}
              {renderItinerarySection && (
                <TripPageItinerarySection
                  itineraryHeading={itineraryHeading}
                  itineraryBody={itineraryBody}
                  itineraryItems={itineraryItems}
                  itineraryAboveContent={itineraryAboveContent}
                  isCenterItineraryHeader={isCenterItineraryHeader}
                  ref={sectionRefs[3]}
                />
              )}
              {/* Trip Extension */}
              {renderExtensionSection && (
                <TripPageExtensionSection
                  extendHeading={extendHeading}
                  extendIntro={extendIntro}
                  extendBody={extendBody}
                  extendItinerary={extendItinerary}
                  extendStartDate={extendStartDate}
                  extendEndDate={extendEndDate}
                  extendPrice={extendPrice}
                  extendTripSize={extendTripSize}
                  extendAboveContent={extendAboveContent}
                  isCenterExtendHeader={isCenterExtendHeader}
                />
              )}
              {/* Details Section */}
              {renderDetailsSection && (
                <TripPageDetailsSection
                  detailsHeading={detailsHeading}
                  detailsBody={detailsBody}
                  detailsBelowContent={detailsBelowContent}
                  isCenterDetailsHeader={isCenterDetailsHeader}
                  ref={sectionRefs[4]}
                />
              )}
              {/* Pricing Section */}
              {renderPricingSection && (
                <TripPagePricingSection
                  pricingHeading={pricingHeading}
                  pricingBody={pricingBody}
                  pricingBelowContent={pricingBelowContent}
                  isCenterPricingHeader={isCenterPricingHeader}
                  ref={sectionRefs[5]}
                />
              )}
              {/* Related Trips */}
              {renderRelatedTrips && (
                <TripPageRelatedTripsSection relatedTrips={relatedTrips} />
              )}
            </>
          )}
          {getNumBloks(ankleContent) > 0 && <Ankle isDark {...props} />}
        </main>
      </Layout>
    </SbEditable>
  );
};

export default TripPage;
