import React from 'react';
import SbEditable from 'storyblok-react';
import CreateStories from '../../utilities/createStories';

export const SBGlobalHeaderPicker = ({ blok }) => {
  const { globalHeader = {} } = blok;

  return (
    <SbEditable content={blok}>
      <CreateStories stories={globalHeader} />
    </SbEditable>
  );
};
