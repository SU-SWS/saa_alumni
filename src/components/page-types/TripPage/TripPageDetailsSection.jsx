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

export const TripPageDetailsSection = React.forwardRef((props, ref) => {
  const {
    detailsHeading,
    detailsBody,
    detailsBelowContent,
    isCenterDetailsHeader,
  } = props;

  return (
    <div ref={ref}>
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
    </div>
  );
});
TripPageDetailsSection.propTypes = TripPageDetailsSectionProps;
