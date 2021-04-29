import React from 'react';
import CreateStories from '../../utilities/createStories';

const LocalFooterPicker = ({blok: { localFooter }}) => {
  return (
    <CreateStories stories={localFooter}/>
  );
};

export default LocalFooterPicker;
