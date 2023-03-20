import React from 'react';
import SbEditable from 'storyblok-react';
import { SAALinkButton } from '../../cta/SAALinkButton';
import { FlexBox } from '../../layout/FlexBox';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
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
    <Heading level={2} size={2} align="left" font="sans">
      {heading}
    </Heading>
    <p className={styles.bodyText}>{body}</p>
    {displayBenefitsButton && (
      <FlexBox justifyContent="center">
        <SAALinkButton
          link={benefitsLink}
          buttonStyle="ghost"
          className={styles.benefitsLink}
        >
          {benefitsButtonText || 'Benefits of membership'}
        </SAALinkButton>
      </FlexBox>
    )}
  </SbEditable>
);

export default MembershipInfoText;
