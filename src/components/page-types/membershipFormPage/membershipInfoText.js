import React from 'react';
import SbEditable from 'storyblok-react';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import { SAALinkButton } from '../../cta/SAALinkButton';
import { FlexBox } from '../../layout/FlexBox';
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
    <Heading
      level={2}
      size={2}
      align="left"
      font="sans"
      weight="semibold"
      className="su-text-black-20"
    >
      {heading}
    </Heading>
    <RichTextRenderer className={styles.bodyText} wysiwyg={body} />
  </SbEditable>
);

export default MembershipInfoText;
