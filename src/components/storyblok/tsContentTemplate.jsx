import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';

export const SBTsContentTemplate = ({ blok }) => {
  const { content } = blok;

  return (
    <SbEditable content={blok}>
      <CreateBloks blokSection={content} />
    </SbEditable>
  );
};
