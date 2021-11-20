import React from 'react';
import { Heading } from '../simple/Heading';
import CreateBloks from '../../utilities/createBloks';

const SearchNoResults = ({ heading, body, additionalContent }) => (
  <div>
    <Heading level={2} size={3} font="serif">
      {heading}
    </Heading>
    <p>{body}</p>
    <div>
      <CreateBloks blokSection={additionalContent} />
    </div>
  </div>
);

export default SearchNoResults;
