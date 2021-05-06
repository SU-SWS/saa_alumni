import React from 'react';
import CreateStories from '../../utilities/createStories';

const PerkCard = ({blok: { perk }}) => {
  return (
    <CreateStories stories={perk} layout='card'/>
  )
}

export default PerkCard;
