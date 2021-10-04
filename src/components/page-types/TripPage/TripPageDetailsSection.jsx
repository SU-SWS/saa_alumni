import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'decanter-react';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import { TripPageSectionWrapper } from './TripPageSectionWrapper';
import * as styles from './TripPageFacultySection.styles';

export const TripPageDetailsSectionProps = {
  detailsHeading: PropTypes.string,
  detailsBody: SBRichTextType,
  detailsBelowContent: SBBlokType,
};

export const TripPageDetailsSection = (props) => {
  const { detailsHeading, detailsBody, detailsBelowContent } = props;

  return (
    <TripPageSectionWrapper heading="Trip details">
      <Container width="site" className={styles.main}>
        <div className={styles.content}>
          <h3 className={styles.heading}>{detailsHeading}</h3>
          <RichTextRenderer wysiwyg={detailsBody} />
        </div>
      </Container>
      {detailsBelowContent && detailsBelowContent.length > 0 && (
        <div className="trip-page-faculty-below-content">
          <CreateBloks blokSection={detailsBelowContent} />
        </div>
      )}
    </TripPageSectionWrapper>
  );
};
TripPageDetailsSection.propTypes = TripPageDetailsSectionProps;
