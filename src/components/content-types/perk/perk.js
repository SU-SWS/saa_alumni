import React from 'react';
import PerkCardView from './perkCardView';
import PerkPageView from './perkPageView';

const Perk = (props) => {
  if (props.layout === 'card') {
    return (
      <PerkCardView {...props} />
    );
  }
  return (
    <PerkPageView {...props} />
  );
};

export default Perk;
