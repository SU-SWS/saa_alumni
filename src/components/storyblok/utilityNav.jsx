import React from 'react';
import SbEditable from 'storyblok-react';
import UtilityNav from '../navigation/UtilityNav';

export const SBUtilityNav = ({
  blok,
  navClasses,
  menuClasses,
  itemClasses,
  ariaLabel,
}) => {
  const { menuItems } = blok;

  return (
    <SbEditable content={blok}>
      <UtilityNav
        menuItems={menuItems}
        ariaLabel={ariaLabel}
        navClasses={navClasses}
        menuClasses={menuClasses}
        itemClasses={itemClasses}
      />
    </SbEditable>
  );
};
