import React from 'react';
import SbEditable from 'storyblok-react';
import GlobalHeader from '../identity/global-header/GlobalHeader';

export const SBGlobalHeader = ({ blok, hasHero, isDark }) => {
  const { siteName, siteLink, utilityNav, mainNav } = blok;

  return (
    <SbEditable content={blok}>
      <GlobalHeader
        siteName={siteName}
        siteLink={siteLink}
        utilityNav={utilityNav}
        mainNav={mainNav}
        hasHero={hasHero}
        isDark={isDark}
      />
    </SbEditable>
  );
};
