import React from 'react';
import CreateBloks from '../../utilities/createBloks';
import { bgTextColorPairs } from '../../utilities/dataSource';

const protectedContentItem = ({ blok: { bgColor, content } }) => (
  <div className={bgTextColorPairs[bgColor]}>
    <CreateBloks blokSection={content} />
  </div>
);

export default protectedContentItem;
