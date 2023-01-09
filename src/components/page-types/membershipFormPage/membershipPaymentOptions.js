import React from 'react';

const MembershipPaymentOptions = ({
  blok: { membershipType, membershipCost, infoText, blok },
}) => (
  <div>
    <p>{membershipType}</p>
    <p>{membershipCost}</p>
    {infoText && <p>{infoText}</p>}
  </div>
);

export default MembershipPaymentOptions;
