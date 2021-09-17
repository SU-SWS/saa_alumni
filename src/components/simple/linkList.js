import React from 'react';
import { Heading } from 'decanter-react';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../utilities/createBloks';

const LinkList = ({ blok: { title, headingLevel, headingColor, links } }) => (
  <div>
    {title && (
      <Heading
        level={parseInt(headingLevel, 10) || 4}
        className={dcnb(
          'su-rs-mb-2 su-font-semibold su-text-m1',
          `${headingColor === 'white' ? 'su-text-white' : 'su-text-black'}`
        )}
      >
        {title}
      </Heading>
    )}
    <ul className="su-list-unstyled children:su-mb-07em children:su-leading-none">
      <CreateBloks blokSection={links} as="li" />
    </ul>
  </div>
);

export default LinkList;
