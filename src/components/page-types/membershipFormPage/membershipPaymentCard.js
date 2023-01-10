import React, { useState } from 'react';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './MembershipCard.styles';

const MembershipPaymentCard = ({
  heading,
  subheading,
  caption,
  children,
  disabled = false,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  // @TODO: Replace with selection logic
  const toggleSelect = () => {
    setIsSelected(!isSelected);
  };

  return (
    <FlexBox direction="col" as="article" className={styles.root}>
      <button
        type="button"
        className={styles.membershipCardWrapper(disabled)}
        onClick={toggleSelect}
      >
        {isSelected && (
          <FlexBox
            className="su-absolute su-right-0 su-text-16 su-font-semibold"
            aria-hidden="true"
          >
            <HeroIcon
              iconType="check"
              className="su-inline-block su-text-saa-electric-blue su-w-[1.4em] su-mt-[-2px] su-mr-[5px]"
            />
            <span>Selected</span>
          </FlexBox>
        )}
        <p>{heading}</p>
        <p>{subheading}</p>
        {caption && <p className="su-text-saa-electric-blue">{caption}</p>}
        <div>{children}</div>
        <FlexBox justifyContent="center">
          <div
            className={
              isSelected
                ? styles.membershipCardSelectedLink
                : styles.membershipCardLink(disabled)
            }
          >
            {isSelected ? 'Selected' : 'Select'}
          </div>
        </FlexBox>
      </button>
    </FlexBox>
  );
};

export default MembershipPaymentCard;
