import React from 'react';
import SbEditable from 'storyblok-react';
import { FlexBox } from '../../layout/FlexBox';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './membershipInformation.styles';

const MembershipInformation = (props) => {
  const {
    blok: {
      membershipInfoText: {
        content: {
          heading,
          body,
          displayBenefitsButton,
          benefitsButtonText,
          benefitsLink,
        },
      },
    },
    blok,
  } = props;

  return (
    <SbEditable content={blok}>
      <Heading level={2} size={2} align="left" font="sans">
        {heading}
      </Heading>
      <p className="su-card-paragraph">{body}</p>
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
};

export default MembershipInformation;
