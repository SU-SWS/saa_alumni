import React from 'react';
import SbEditable from 'storyblok-react';
import CardImage from '../media/cardImage';
import CreateBloks from '../../utilities/createBloks';
import getNumBloks from '../../utilities/getNumBloks';
import { Heading } from 'decanter-react';
import { dcnb } from 'cnbuilder';

const BasicCard = (props) => {
  const numCta = getNumBloks(props.blok.cta);

  let wrapperClasses, imageClasses;

  // Basic card image has aspect ratio 4x3 for non-round option
  let imageWrapperClasses = 'su-aspect-w-4 su-aspect-h-3';

  // Option to display image as round thumbnail
  if (props.blok.isRound) {
    wrapperClasses = 'su-rs-pt-3';
    imageWrapperClasses = 'su-w-[14rem] su-h-[14rem] su-rs-ml-2 su-rounded-full su-border-[7px] su-border-solid su-border-digital-red su-overflow-hidden';
    imageClasses = 'su-w-full su-h-full';
  }

  let headlineSize = 'su-type-2';

  if (props.blok.isBigHeadline) {
    headlineSize = 'su-type-4';
  }

  // Content alignment including image, default is left-align
  if (props.blok.align === 'center') {
    wrapperClasses = dcnb(wrapperClasses, 'children:su-mx-auto su-text-center');
  }

  return (
    <SbEditable content={props.blok}>
      <div className={`basic-card su-bg-white su-shadow su-max-w-500 ${wrapperClasses}`}>
        {props.blok.image.filename?.startsWith('http') && (
          <div className={imageWrapperClasses}>
            <CardImage
              image={props.blok.image}
              size={props.blok.isRound ? 'thumb' : 'vertical'}
              imageFocus={props.blok.imageFocus}
              className={`su-object-cover ${imageClasses}`}
              loading='lazy'
            />
          </div>
        )}
        <div className='card-body su-rs-px-2 su-rs-pt-2 su-rs-pb-4'>
          <Heading
            level={props.blok.headingLevel ?? 3}
            className={dcnb('su-font-serif su-bold su-mb-0', headlineSize)}
          >
            {props.blok.headline}
          </Heading>
          {props.blok.text &&
            <p className='su-card-paragraph su-rs-mt-neg1 su-mb-0'>{props.blok.text}</p>
          }
          {numCta > 0 &&
            <div className='su-rs-mt-2'>
              <CreateBloks blokSection={props.blok.cta} />
            </div>
          }
        </div>
      </div>
    </SbEditable>
  );
};

export default BasicCard;
