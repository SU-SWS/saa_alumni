import React from 'react';
import SbEditable from 'storyblok-react';
import { Heading } from 'decanter-react';
import CreateBloks from '../../utilities/createBloks';

const LinkGroup = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className='su-text-black-20'>
        <Heading level={2} font='serif' weight='bold' className='su-text-18 su-tracking-normal su-rs-mb-1'>{props.blok.heading}</Heading>
        <ul className='su-list-unstyled su-link-regular su-text-19 xl:su-text-20'>
          <CreateBloks blokSection={props.blok.linkList} />
        </ul>
      </div>
    </SbEditable>
  );
};

export default LinkGroup;
