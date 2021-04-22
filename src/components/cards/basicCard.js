import React from 'react';
import SbEditable from 'storyblok-react';
import FullWidthImage from '../media/fullWidthImage';
import { Heading } from 'decanter-react';

const BasicCard = (props) => {
  let wrapperClasses = 'su-aspect-w-4 su-aspect-h-3';
  let imageClasses;

  if (props.blok.isRound) {
    wrapperClasses = 'su-w-[14rem] su-h-[14rem] su-rounded-full su-border-[7px] su-border-solid su-border-cardinal-red su-overflow-hidden';
    imageClasses = 'su-w-full su-h-full';
  }

  return (
    <SbEditable content={props.blok}>
      <div className={`basic-card`}>
        {props.blok.image.filename?.startsWith('http') && (
          <div className={wrapperClasses}>
            <FullWidthImage
              image={props.blok.image}
              imageFocus={props.blok.imageFocus}
                className={`su-object-cover ${imageClasses}`}
              loading='lazy'
              alt=''
            />
          </div>
        )}
        <Heading font='serif'>{props.blok.headline}</Heading>
        <p>{props.blok.text}</p>
      </div>
    </SbEditable>
  );
};

export default BasicCard;
