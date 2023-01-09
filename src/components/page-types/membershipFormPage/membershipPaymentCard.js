import React, { useState } from 'react';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './MembershipCard.styles';

const MembershipPaymentCard = ({ heading, subheading, children }) => {
  const [isSelected, setIsSelected] = useState(false);

  // @TODO: Replace with selection logic
  const toggleSelect = () => {
    setIsSelected(!isSelected);
  };

  return (
    <FlexBox direction="col" as="article" className={styles.root}>
      <button type="button" onClick={toggleSelect}>
        {children}
        <FlexBox justifyContent="center">
          <div>{isSelected ? 'Selected' : 'Select'}</div>
        </FlexBox>
      </button>
    </FlexBox>
  );
};

export default MembershipPaymentCard;
