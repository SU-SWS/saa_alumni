import React from 'react';
import * as styles from './membershipPaymentCard.styles';

const MembershipPaymentOptions = ({
  blok: { membershipType, membershipCost, infoText, blok },
}) => (
  <>
    <p className={styles.membershipType}>{membershipType}</p>
    <div className={styles.costAndInfoTextWrapper}>
      <p className={styles.membershipCost}>${membershipCost}</p>
      {infoText && <p className={styles.infoText}>{infoText}</p>}
    </div>
  </>
);

export default MembershipPaymentOptions;
