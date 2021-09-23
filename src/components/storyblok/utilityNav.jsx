import React from 'react';
import SbEditable from 'storyblok-react';
import UtilityNav from '../navigation/utility-nav/UtilityNav';

export const SBUtilityNav = ({ blok }) => {
  const { menuItems } = blok;

  return (
    <SbEditable content={blok}>
      <UtilityNav menuItems={menuItems} />
    </SbEditable>
  );
};
