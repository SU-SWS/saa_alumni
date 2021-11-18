import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'decanter-react';
import { Heading } from '../../simple/Heading';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import * as styles from './TripPageSectionHeader.styles';
import hasRichText from '../../../utilities/hasRichText';

export const TripPageSectionHeaderProps = {
  heading: PropTypes.string,
  body: SBRichTextType,
  isCenter: PropTypes.bool,
  headingSize: PropTypes.string,
};

export const TripPageSectionHeader = (props) => {
  const { heading, body, isCenter, headingSize } = props;

  return (
    <Container width="site" className={styles.sectionHeader({ isCenter })}>
      <Heading
        level={3}
        font="serif"
        className={styles.sectionHeading({ isCenter, headingSize })}
      >
        {heading}
      </Heading>
      {hasRichText(body) && (
        <RichTextRenderer wysiwyg={body} className={styles.sectionIntro} />
      )}
    </Container>
  );
};
TripPageSectionHeader.propTypes = TripPageSectionHeaderProps;
