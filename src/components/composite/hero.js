import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, Heading } from 'decanter-react';
import FullWidthImage from '../media/fullWidthImage';
import CreateBloks from '../../utilities/createBloks';

const Hero = (props) => {
  return (
    <SbEditable content={props.blok}>
      <Container className={`hero su-relative`} width='full'>
        {props.blok.image.filename?.startsWith('http') && (
          <FullWidthImage
            filename={props.blok.image.filename}
            visibleVertical={props.blok.vCrop}
            className='hero su-absolute su-top-0 su-w-full su-h-full su-min-h-600 su-overflow-hidden'
            imageClasses='su-w-full su-h-full su-object-cover'
            alt={props.blok.image.alt}
          />
        )}
        <div className='su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-b su-from-transparent su-to-saa-black' />
        <Container className='su-relative su-pt-11 su-pb-7'>
          <p className='su-text-center su-text-white su-font-semibold su-text-m4 su-mb-02em'>{props.blok.sansSuper}</p>
          <p className='su-text-center su-text-white su-font-serif su-text-m2 su-mb-02em'>{props.blok.serifSuper}</p>
          <Heading level={1} font='serif' weight='bold' className='su-text-white su-text-center su-text-m8 su-tracking-normal su-mb-02em'>{props.blok.headline}</Heading>
          <p className='su-text-center su-text-white su-max-w-600 su-mx-auto su-text-m1 su-mb-0'>{props.blok.sansSub}</p>
        </Container>
        <p className='su-text-center su-text-white su-font-semibold'>Scroll to explore</p>
      </Container>
    </SbEditable>
  );
};

export default Hero;
