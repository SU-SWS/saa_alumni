import React from 'react';
import SbEditable from 'storyblok-react';
import GlobalHeader from '../identity/GlobalHeader/GlobalHeader';

export const SBGlobalHeader = ({ blok, hasHero, isDark }) => {
  const { siteName, siteLink, utilityNav, mainNav, searchPageUrl } = blok;

  return (
    <SbEditable content={blok}>
      <GlobalHeader
        siteName={siteName}
        siteLink={siteLink}
        utilityNav={utilityNav}
        mainNav={mainNav}
        hasHero={hasHero}
        isDark={isDark}
        searchPageUrl={searchPageUrl}
      />
    </SbEditable>
  );
};
