import React from 'react';
import SbEditable from 'storyblok-react';
import CardImage from '../media/cardImage';
import CreateBloks from '../../utilities/createBloks';
import { Heading } from 'decanter-react';
import { dcnb } from 'cnbuilder';

const BasicCard = (props) => {
  let wrapperClasses = 'su-aspect-w-4 su-aspect-h-3';
  let imageClasses;

  if (props.blok.isRound) {
    wrapperClasses = 'su-w-[14rem] su-h-[14rem] su-rs-mt-2 su-rs-ml-2 su-rounded-full su-border-[7px] su-border-solid su-border-cardinal-red su-overflow-hidden';
    imageClasses = 'su-w-full su-h-full';
  }

  let headlineSize = 'su-type-2';

  if (props.blok.isBigHeadline) {
    headlineSize = 'su-type-4';
  }

  return (
    <SbEditable content={props.blok}>
      <div className={`basic-card su-bg-white su-shadow su-max-w-500`}>
        {props.blok.image.filename?.startsWith('http') && (
          <div className={wrapperClasses}>
            <CardImage
              image={props.blok.image}
              size={props.blok.isRound ? 'thumb' : 'vertical'}
              imageFocus={props.blok.imageFocus}
              className={`su-object-cover ${imageClasses}`}
              loading='lazy'
            />
          </div>
        )}
        <div className='card-body su-rs-p-2'>
          <Heading
            level={props.blok.headingLevel ?? 2}
            className={dcnb('su-font-serif su-bold su-mb-0', headlineSize)}
          >
            {props.blok.headline}
          </Heading>
          {props.blok.text &&
            <p className='su-card-paragraph su-rs-mt-0'>{props.blok.text}</p>
          }
          <CreateBloks blokSection={props.blok.cta} />
        </div>
      </div>
    </SbEditable>
  );
};

export default BasicCard;
