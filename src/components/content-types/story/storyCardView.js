import React from 'react';
import SaaStoryCard from '../../cards/saaStoryCard';

const StoryCardView = ({ blok, ...props }) => (
  <SaaStoryCard blok={{ ...blok, ...props }} />
);
export default StoryCardView;
