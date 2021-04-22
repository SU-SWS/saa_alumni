import React from 'react';
import SbEditable from 'storyblok-react';
import FullWidthImage from '../media/fullWidthImage';

const BasicCard = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`basic-card`}>
        {props.blok.image.filename?.startsWith('http') && (
          <div className='su-aspect-w-16 su-aspect-h-9'>
            <FullWidthImage
              image={props.blok.image}
              imageFocus={props.blok.imageFocus}
              className='su-w-full su-h-full su-object-cover'
              loading='eager'
              alt={props.blok.image.alt}
            />
          </div>
        )}
        <h2>{props.blok.headline}</h2>
        <p>{props.blok.text}</p>
      </div>
    </SbEditable>
  );
};

export default BasicCard;
