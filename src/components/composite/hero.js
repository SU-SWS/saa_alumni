import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, FlexBox, FlexCell, Heading, SrOnlyText } from 'decanter-react';
import FullWidthImage from '../media/fullWidthImage';
import CreateBloks from '../../utilities/createBloks';
import { ArrowDownIcon } from '@heroicons/react/outline';

const Hero = (props) => {
  return (
    <SbEditable content={props.blok}>
      <Container className={`hero su-relative`} width='full'>
        {props.blok.image.filename?.startsWith('http') && (
          <FullWidthImage
            filename={props.blok.image.filename}
            imageFocus={props.blok.imageFocus}
            className='hero su-absolute su-top-0 su-w-full su-h-full su-min-h-600 su-overflow-hidden'
            imageClasses='su-w-full su-h-full su-object-cover'
            alt={props.blok.image.alt}
          />
        )}
        <div className='su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-b su-from-transparent su-to-saa-black' aria-hidden='true' />
        <Container className='su-relative su-rs-pt-10 su-rs-pb-4'>
          <FlexBox direction='col'>
            <FlexCell>
              <p className='su-text-center su-text-white su-font-semibold su-leading-display su-text-m2 md:su-text-m4 su-mb-0'>{props.blok.sansSuper}</p>
              <p className='su-text-center su-text-white su-font-serif su-leading-display su-text-m1 md:su-text-m2 su-mb-05em'>{props.blok.serifSuper}</p>
              <Heading level={1}
                       font='serif'
                       weight='bold'
                       className='su-text-white su-text-center su-text-m4 md:su-text-m6 lg:su-text-m8 su-leading-tight su-tracking-normal su-mb-02em'
              >
                {props.blok.headline}
              </Heading>
              <p className='su-text-center su-text-white su-max-w-600 su-mx-auto su-big-paragraph su-mb-0'>{props.blok.sansSub}</p>
            </FlexCell>
            <FlexCell className='su-rs-mt-3'>
              <CreateBloks blokSection={props.blok.cta} />
            </FlexCell>
            <FlexCell
              grow={false}
              className='su-text-center su-text-white su-font-semibold su-rs-mt-4 su-font-serif su-font-regular su-text-19 md:su-text-22'
            >
              <p className='su-mb-02em'>Scroll to explore</p>
              <a href={`#${props.blok.scrollTo}`} className='su-block su-mx-auto su-w-fit su-group'>
                <SrOnlyText srText='Jump to main content' />
                <ArrowDownIcon
                  className='su-transition-colors su-text-saa-digital-red su-w-40 su-h-40 su-p-6 su-border-2 su-border-cardinal-red su-rounded-full group-hover:su-bg-cardinal-red group-focus:su-bg-cardinal-red'
                  aria-hidden='true' />
              </a>
            </FlexCell>
          </FlexBox>
        </Container>
      </Container>
    </SbEditable>
  );
};

export default Hero;
