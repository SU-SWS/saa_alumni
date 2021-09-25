import React from 'react';
import SbEditable from 'storyblok-react';
import UtilityNav from '../navigation/UtilityNav';

export const SBUtilityNav = ({ blok, className }) => {
  const { menuItems } = blok;

  return (
    <SbEditable content={blok}>
      <UtilityNav menuItems={menuItems} className={className} />
    </SbEditable>
  );
};
