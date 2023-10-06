import React from 'react';
import SbEditable from 'storyblok-react';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import { Heading } from '../../simple/Heading';
import * as styles from './membershipInfoText.styles';

const MembershipInfoText = ({
  blok: {
    heading,
    body,
    displayBenefitsButton,
    benefitsButtonText,
    benefitsLink,
  },
  blok,
}) => (
  <SbEditable content={blok}>
    <Heading level={2} size={2} align="left" font="sans" weight="semibold">
      {heading}
    </Heading>
    <RichTextRenderer className={styles.bodyText} wysiwyg={body} />
  </SbEditable>
);

export default MembershipInfoText;
