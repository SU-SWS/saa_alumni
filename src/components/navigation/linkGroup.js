import React from 'react';
import SbEditable from 'storyblok-react';
import { Heading } from 'decanter-react';
import CreateBloks from '../../utilities/createBloks';

const LinkGroup = ({ blok: { heading, linkList }, blok }) => (
  <SbEditable content={blok}>
    <div>
      <Heading
        level={2}
        font="serif"
        weight="bold"
        className="su-text-18 su-tracking-normal su-rs-mb-1"
      >
        {heading}
      </Heading>
      <ul className="su-list-unstyled su-link-regular su-text-19 xl:su-text-20">
        <CreateBloks blokSection={linkList} />
      </ul>
    </div>
  </SbEditable>
);

export default LinkGroup;
