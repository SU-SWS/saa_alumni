import React from 'react';
import SbEditable from 'storyblok-react';
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
        <a href={benefitsLink} className={styles.benefitsLink}>
          {benefitsButtonText || 'Benefits of Membership'}
          <HeroIcon
            iconType="arrow-right"
            className={styles.benefitsLinkIcon}
            isAnimate
          />
        </a>
      </FlexBox>
    )}
  </SbEditable>
);

export default MembershipInfoText;
