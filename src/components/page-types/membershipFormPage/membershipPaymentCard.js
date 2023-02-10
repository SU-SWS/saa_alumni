import React from 'react';
import { dcnb } from 'cnbuilder';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './membershipPaymentCard.styles';

const MembershipPaymentCard = ({
  heading,
  subheading,
  caption,
  children,
  onClick = () => {},
  id,
  isSelected,
}) => (
  <FlexBox direction="col" as="article" className={styles.root}>
    <button
      type="button"
      className={dcnb(
        styles.membershipPaymentCardWrapper,
        isSelected && 'su-bg-saa-black'
      )}
      onClick={() => onClick(id)}
    >
      <FlexBox
        justifyContent="center"
        className={styles.initialAndSelectionWrapper}
      >
        {isSelected && (
          <FlexBox className={styles.selectionWrapper} aria-hidden="true">
            <HeroIcon
              iconType="check"
              className="su-inline-block su-right su-text-saa-electric-blue su-w-[1.4em] su-mt-[-2px] su-mr-[5px]"
            />
            <span>Selected</span>
          </FlexBox>
        )}
      </FlexBox>
      <p className="su-type-2 su-font-bold su-rs-mt-1 su-mb-0">{heading}</p>
      <p className="su-mb-0">{subheading}</p>
      {caption && (
        <p className="su-text-saa-electric-blue su-rs-mb-1">{caption}</p>
      )}
      <div>{children}</div>
      <FlexBox justifyContent="center">
        <div
          className={
            isSelected
              ? styles.membershipCardSelectedLink
              : styles.membershipCardLink
          }
        >
          {isSelected ? 'Selected' : 'Select'}
        </div>
      </FlexBox>
    </button>
  </FlexBox>
);
export default MembershipPaymentCard;
