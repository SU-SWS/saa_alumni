import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import { TripPageSectionWrapper } from './TripPageSectionWrapper';
import { TripPageSectionHeader } from './TripPageSectionHeader';

export const TripPageFacultySectionProps = {
  facultyHeading: PropTypes.string,
  facultyBody: SBRichTextType,
  facultyBelowContent: SBBlokType,
  isCenterFacultyHeader: PropTypes.bool,
};

export const TripPageFacultySection = React.forwardRef(
  (
    { facultyHeading, facultyBody, facultyBelowContent, isCenterFacultyHeader },
    ref
  ) => (
    <div ref={ref}>
      <TripPageSectionWrapper
        heading="Faculty leader"
        isCenter={isCenterFacultyHeader}
      >
        <TripPageSectionHeader
          isCenter={isCenterFacultyHeader}
          heading={facultyHeading}
          body={facultyBody}
        />
        {facultyBelowContent && facultyBelowContent.length > 0 && (
          <div className="trip-page-faculty-below-content">
            <CreateBloks blokSection={facultyBelowContent} />
          </div>
        )}
      </TripPageSectionWrapper>
    </div>
  )
);
TripPageFacultySection.propTypes = TripPageFacultySectionProps;
