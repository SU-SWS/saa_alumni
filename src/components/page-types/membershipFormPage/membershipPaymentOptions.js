import React from 'react';

const MembershipPaymentOptions = ({
  blok: { membershipType, membershipCost, infoText, blok },
}) => (
  <div className="su-rs-mb-0">
    <p className="su-mb-0">{membershipType}</p>
    <div className="su-rs-mb-1">
      <p className="su-type-2 su-font-bold su-mb-0">${membershipCost}</p>
      {infoText && (
        <p className="su-italic su-text-black-40 su-mb-0 su-text-16">
          {infoText}
        </p>
      )}
    </div>
  </div>
);

export default MembershipPaymentOptions;
