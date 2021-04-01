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
        <div className='su-rs-mb-0 xl:su-mb-0'>
          <CreateBloks blokSection={props.blok.column1} classes='su-rs-mb-3 last:su-mb-0' />
        </div>
        <div className='su-rs-mb-0 xl:su-mb-0'>
          <CreateBloks blokSection={props.blok.column2} classes='su-rs-mb-3 last:su-mb-0' />
        </div>
        <div className={col3Classes}>
          <CreateBloks blokSection={props.blok.column3} classes='su-rs-mb-3 last:su-mb-0' />
        </div>
        <div className={col4Classes}>
          <CreateBloks blokSection={props.blok.column4} classes='su-rs-mb-3 last:su-mb-0' />
        </div>
      </Container>
    </SbEditable>
  )
};

export default LocalFooter;
