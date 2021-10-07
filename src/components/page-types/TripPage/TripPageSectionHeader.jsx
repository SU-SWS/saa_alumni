import React from 'react';
import PropTypes from 'prop-types';
import { Container, Heading } from 'decanter-react';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import * as styles from './TripPageSectionHeader.styles';
import hasRichText from '../../../utilities/hasRichText';

export const TripPageSectionHeaderProps = {
  heading: PropTypes.string,
  body: SBRichTextType,
  isCenter: PropTypes.bool,
};

export const TripPageSectionHeader = (props) => {
  const { heading, body, isCenter } = props;

  return (
    <Container width="site" className={styles.sectionHeader({ isCenter })}>
      <Heading
        level={3}
        font="serif"
        weight="bold"
        className={styles.sectionHeading({ isCenter })}
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
