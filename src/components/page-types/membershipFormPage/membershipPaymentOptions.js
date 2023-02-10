import React from 'react';

const MembershipPaymentOptions = ({
  blok: { membershipType, membershipCost, infoText, blok },
}) => (
  <div>
    <p className="su-mb-0">{membershipType}</p>
    <p className="su-type-2 su-font-bold su-rs-mb-0">${membershipCost}</p>
    {infoText && <p className="su-mb-0">{infoText}</p>}
  </div>
);

export default MembershipPaymentOptions;
