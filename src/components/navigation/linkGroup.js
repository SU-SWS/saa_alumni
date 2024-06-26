import React from 'react';
import SbEditable from 'storyblok-react';
import { Heading } from '../simple/Heading';
import CreateBloks from '../../utilities/createBloks';

const LinkGroup = ({ blok: { heading, linkList }, blok }) => (
  <SbEditable content={blok}>
    <div>
      {heading && (
        <Heading
          level={2}
          font="serif"
          tracking="normal"
          className="su-text-18 su-rs-mb-1"
        >
          {heading}
        </Heading>
      )}
      <ul className="su-list-unstyled su-link-regular su-text-19 xl:su-text-20">
        <CreateBloks blokSection={linkList} />
      </ul>
    </div>
  </SbEditable>
);

export default LinkGroup;
