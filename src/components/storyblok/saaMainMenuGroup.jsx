import React from 'react';
import SbEditable from 'storyblok-react';
import SAAMainMenuGroup from '../navigation/SAAMainNav/SAAMainMenuGroup';

export const SBSAAMainMenuGroup = ({
  blok,
  childMenuClasses,
  childItemClasses,
}) => {
  const { parentText, parentLink, childMenuItems } = blok;

  return (
    <SbEditable content={blok}>
      <SAAMainMenuGroup
        parentText={parentText}
        parentLink={parentLink}
        childMenuItems={childMenuItems}
        childMenuClasses={childMenuClasses}
        childItemClasses={childItemClasses}
      />
    </SbEditable>
  );
};
