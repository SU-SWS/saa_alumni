import React from 'react';
import SbEditable from 'storyblok-react';
import GlobalHeader from '../identity/global-header/GlobalHeader';

export const SBGlobalHeaderPicker = ({ blok }) => {
  const { globalHeader = {} } = blok;

  return (
    <SbEditable content={blok}>
      <GlobalHeader globalHeader={globalHeader} />
    </SbEditable>
  );
};
