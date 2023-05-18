import React from 'react';
import { dcnb } from 'cnbuilder';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './membershipPaymentCard.styles';
import { Heading } from '../../simple/Heading';

const MembershipPaymentCard = ({
  heading,
  subheading,
  caption,
  children,
  onClick = () => {},
  id,
  isSelected,
}) => (
  <FlexBox direction="col" className={styles.root}>
    <button
      type="button"
      className={dcnb(
        styles.membershipPaymentCardWrapper,
        isSelected &&
          'su-bg-saa-black su-gradient-border su-border-to-rt-palo-verde-dark-to-saa-electric-blue'
      )}
      onClick={() => onClick(id)}
    >
      <div className="su-w-full">
        <FlexBox
          justifyContent="center"
          className={styles.initialAndSelectionWrapper}
        >
          {isSelected && (
            <div className={styles.selectionWrapper} aria-hidden="true">
              <HeroIcon iconType="check" className={styles.checkLinkIcon} />
              <span>Selected</span>
            </div>
          )}
        </FlexBox>
        <Heading level={3} size={2} className={styles.heading}>
          {heading}
        </Heading>
        <div className={styles.subheadingAndCaptionWrapper}>
          <p className={styles.subheading}>{subheading}</p>
          {caption && <p className={styles.caption}>{caption}</p>}
        </div>
        <div>{children}</div>
      </div>
      <FlexBox justifyContent="center">
        <div
          className={
            isSelected
              ? styles.membershipPaymentCardSelectedLink
              : styles.membershipPaymentCardLink
          }
        >
          {isSelected ? 'Selected' : 'Select'}
        </div>
      </FlexBox>
    </button>
  </FlexBox>
);
export default MembershipPaymentCard;
