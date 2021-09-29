import React from 'react';
import SbEditable from 'storyblok-react';
import SAAMainMenuGroup from '../navigation/SAAMainNav/SAAMainMenuGroup';

export const SBSAAMainMenuGroup = ({ blok }) => {
  const { parentText, parentLink, childMenuItems, panelFacing } = blok;

  return (
    <SbEditable content={blok}>
      <SAAMainMenuGroup
        parentText={parentText}
        parentLink={parentLink}
        childMenuItems={childMenuItems}
        panelFacing={panelFacing}
      />
    </SbEditable>
  );
};
