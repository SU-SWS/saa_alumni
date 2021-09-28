import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { Container } from 'decanter-react';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import { TripPageSectionWrapper } from './TripPageSectionWrapper';
import * as styles from './TripPageItinerarySection.styles';

export const TripPageItinerarySectionProps = {
  itineraryHeading: PropTypes.string,
  itineraryBody: SBRichTextType,
  itineraryItems: SBBlokType,
  itineraryAboveContent: SBBlokType,
  itineraryBelowContent: SBBlokType,
};

export const TripPageItinerarySection = (props) => {
  const {
    itineraryHeading,
    itineraryBody,
    itineraryAboveContent,
    itineraryItems,
    itineraryBelowContent,
  } = props;

  return (
    <TripPageSectionWrapper heading="Itinerary">
      <Container width="site" className={styles.main}>
        <div className={styles.content}>
          <h3 className={styles.heading}>{itineraryHeading}</h3>
          <RichTextRenderer wysiwyg={itineraryBody} />
        </div>
      </Container>
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
