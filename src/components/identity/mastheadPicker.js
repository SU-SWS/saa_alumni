import React from 'react';
import CreateStories from '../../utilities/createStories';

const MastheadPicker = ({ blok: { masthead }, hasHero, isDark }) => (
  <CreateStories stories={masthead} hasHero={hasHero} isDark={isDark} />
);

export default MastheadPicker;
