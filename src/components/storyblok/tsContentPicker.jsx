import React from 'react';
import SbEditable from 'storyblok-react';
import CreateStories from '../../utilities/createStories';

export const SBTsContentPicker = ({ blok }) => {
  const { contentPicker } = blok;

  return (
    <SbEditable content={blok}>
      <CreateStories stories={contentPicker} />
    </SbEditable>
  );
};
