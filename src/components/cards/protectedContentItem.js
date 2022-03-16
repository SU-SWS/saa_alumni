import React from 'react';
import CreateBloks from '../../utilities/createBloks';

const protectedContentItem = ({ blok }) => (
  <div className="su-text-center su-text-white">
    <CreateBloks blokSection={blok.content} />
  </div>
);

export default protectedContentItem;
