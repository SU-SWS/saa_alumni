import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import { TripPageSectionWrapper } from './TripPageSectionWrapper';
import { TripPageSectionHeader } from './TripPageSectionHeader';

export const TripPageDetailsSectionProps = {
  detailsHeading: PropTypes.string,
  detailsBody: SBRichTextType,
  detailsBelowContent: SBBlokType,
  isCenterDetailsHeader: PropTypes.bool,
};

export const TripPageDetailsSection = (props) => {
  const {
    detailsHeading,
    detailsBody,
    detailsBelowContent,
    isCenterDetailsHeader,
  } = props;

  return (
    <TripPageSectionWrapper
      heading="Trip details"
      isCenter={isCenterDetailsHeader}
    >
      <TripPageSectionHeader
        isCenter={isCenterDetailsHeader}
        heading={detailsHeading}
        body={detailsBody}
      />
      {detailsBelowContent && detailsBelowContent.length > 0 && (
        <div className="trip-page-faculty-below-content">
          <CreateBloks blokSection={detailsBelowContent} />
        </div>
      )}
    </TripPageSectionWrapper>
  );
};
TripPageDetailsSection.propTypes = TripPageDetailsSectionProps;
