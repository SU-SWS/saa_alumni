import React from 'react';
import SbEditable from 'storyblok-react';
import SAAMainNav from '../navigation/MainNav/SAAMainNav';

export const SBSAAMainNav = ({ blok, ariaLabel }) => {
  const { menuItems } = blok;

  return (
    <SbEditable content={blok}>
      <SAAMainNav menuItems={menuItems} ariaLabel={ariaLabel} />
    </SbEditable>
  );
};
