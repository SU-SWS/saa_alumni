import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import { TripPageSectionWrapper } from './TripPageSectionWrapper';
import { TripPageSectionHeader } from './TripPageSectionHeader';
import * as styles from './TripPageItinerarySection.styles';

export const TripPageItinerarySectionProps = {
  itineraryHeading: PropTypes.string,
  itineraryBody: SBRichTextType,
  itineraryItems: SBBlokType,
  itineraryAboveContent: SBBlokType,
  itineraryBelowContent: SBBlokType,
  isCenterItineraryHeader: PropTypes.bool,
};

export const TripPageItinerarySection = (props) => {
  const {
    itineraryHeading,
    itineraryBody,
    itineraryAboveContent,
    itineraryItems,
    itineraryBelowContent,
    isCenterItineraryHeader,
  } = props;

  return (
    <TripPageSectionWrapper
      heading="Itinerary"
      isCenter={isCenterItineraryHeader}
    >
      <TripPageSectionHeader
        isCenter={isCenterItineraryHeader}
        heading={itineraryHeading}
        body={itineraryBody}
      />
      {itineraryAboveContent && itineraryAboveContent.length > 0 && (
        <div className="trip-page-itinerary-above-content">
          <CreateBloks blokSection={itineraryAboveContent} />
        </div>
      )}
      {itineraryItems && itineraryItems.length > 0 && (
        <div className={dcnb('trip-page-itinerary-items', styles.itinerary)}>
          <CreateBloks blokSection={itineraryItems} />
        </div>
      )}
      {itineraryBelowContent && itineraryBelowContent.length > 0 && (
        <div className="trip-page-itinerary-below-content">
          <CreateBloks blokSection={itineraryBelowContent} />
        </div>
      )}
    </TripPageSectionWrapper>
  );
};
TripPageItinerarySection.propTypes = TripPageItinerarySectionProps;
