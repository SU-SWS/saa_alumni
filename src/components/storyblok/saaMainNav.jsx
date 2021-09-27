import React from 'react';
import SbEditable from 'storyblok-react';
import SAAMainNav from '../navigation/SAAMainNav/SAAMainNav';

export const SBSAAMainNav = ({
  blok,
  navClasses,
  menuClasses,
  itemClasses,
  ariaLabel,
}) => {
  const { menuItems } = blok;

  return (
    <SbEditable content={blok}>
      <SAAMainNav
        menuItems={menuItems}
        ariaLabel={ariaLabel}
        navClasses={navClasses}
        menuClasses={menuClasses}
        itemClasses={itemClasses}
      />
    </SbEditable>
  );
};
