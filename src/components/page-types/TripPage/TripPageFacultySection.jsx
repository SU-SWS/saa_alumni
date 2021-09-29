import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'decanter-react';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import { TripPageSectionWrapper } from './TripPageSectionWrapper';
import * as styles from './TripPageFacultySection.styles';

export const TripPageFacultySectionProps = {
  facultyHeading: PropTypes.string,
  facultyBody: SBRichTextType,
  facultyBelowContent: SBBlokType,
};

export const TripPageFacultySection = (props) => {
  const { facultyHeading, facultyBody, facultyBelowContent } = props;

  return (
    <TripPageSectionWrapper heading="Faculty leaders">
      <Container width="site" className={styles.main}>
        <div className={styles.content}>
          <h3 className={styles.heading}>{facultyHeading}</h3>
          <RichTextRenderer wysiwyg={facultyBody} />
        </div>
      </Container>
      {facultyBelowContent && facultyBelowContent.length > 0 && (
        <div className="trip-page-faculty-below-content">
          <CreateBloks blokSection={facultyBelowContent} />
        </div>
      )}
    </TripPageSectionWrapper>
  );
};
TripPageFacultySection.propTypes = TripPageFacultySectionProps;
