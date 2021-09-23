import React from 'react';
import SbEditable from 'storyblok-react';
import GlobalHeader from '../identity/global-header/GlobalHeader';

export const SBGlobalHeader = ({ blok }) => {
  const { utilityNav, mainNav } = blok;

  return (
    <SbEditable content={blok}>
      <GlobalHeader utilityNav={utilityNav} mainNav={mainNav} />
    </SbEditable>
  );
};
