import React from 'react';
import CreateBloks from "../../utilities/createBloks";

const protectedContentItem = ({ blok }) => {
  return (
    <div className="su-text-center su-bg-black su-text-white su-py-45">
      <CreateBloks blokSection={blok.content} />
    </div>
  )
}

export default protectedContentItem;
