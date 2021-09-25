import React from 'react';
import CreateStory from '../../utilities/createStory';

export const SBGlobalHeaderPicker = ({ blok, hasHero, isDark }) => {
  const { globalHeader } = blok;

  return <CreateStory story={globalHeader} hasHero={hasHero} isDark={isDark} />;
};
