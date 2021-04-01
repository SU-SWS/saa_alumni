import React from "react";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";
import SbEditable from "storyblok-react";
import { Container } from 'decanter-react';

const LocalFooter = (props) => {
  let numBlokColumn4 = getNumBloks(props.blok.column4);
  let col4Classes = '', col3Classes = '';

  // Assign margin classes to column 3 and 4 if column 4 isn't empty
  if (numBlokColumn4 > 0) {
    col3Classes = 'su-rs-mb-0 xl:su-mb-0';
    col4Classes = 'su-rs-mb-0 md:su-mb-0';
  }

  return (
    <SbEditable content={props.blok}>
      <Container className='su-bg-saa-black su-text-white' width='site'>
        <div className='su-rs-pt-10 su-rs-pb-6 su-w-200 xl:su-w-300'>
          <img src='/images/saa-logo-white.svg' width='300' />
        </div>
        <div>
          <div className='su-font-semibold su-pb-02em'><strong>{props.blok.organization}</strong></div>
          <address>
            <div className='su-pb-02em'>{props.blok.address1}</div>
            <div className='su-pb-02em'>{props.blok.address2}</div>
            <div>{props.blok.address3}</div>
          </address>
        </div>
      </Container>
    </SbEditable>
  )
};

export default LocalFooter;
