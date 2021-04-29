import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, FlexBox, FlexCell, Heading, SrOnlyText } from 'decanter-react';
import FullWidthImage from '../media/fullWidthImage';
import CreateBloks from '../../utilities/createBloks';
import { ArrowDownIcon } from '@heroicons/react/outline';
import getNumBloks from '../../utilities/getNumBloks';

const Hero = (props) => {
  let headlineSize = 'su-text-m4 md:su-text-m6 lg:su-text-m8';

  if (props.blok.isSmallHeadline) {
    headlineSize = 'su-text-m3 md:su-text-m5 lg:su-text-m7';
  }

  let gradientFrom = 'su-from-transparent';

  if (props.blok.isDarkGradient) {
    gradientFrom = 'su-from-transparent-black';
  }

  let numCta = getNumBloks(props.blok.cta);

  return (
    <SbEditable content={props.blok}>
      <Container className={`hero su-relative su-bg-saa-black`} width='full'>
        {props.blok.image.filename?.startsWith('http') && (
          <FullWidthImage
            filename={props.blok.image.filename}
            imageFocus={props.blok.imageFocus}
            className='hero su-absolute su-top-0 su-w-full su-h-full su-min-h-600 su-overflow-hidden'
            imageClasses='su-w-full su-h-full su-object-cover'
            alt={props.blok.image.alt}
          />
        )}
        <div className={`su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-b ${gradientFrom} su-to-saa-black`} aria-hidden='true' />
        <Container className='su-relative su-rs-pt-9 su-rs-pb-4'>
          <FlexBox direction='col' className='lg:su-mt-[190px]'>
            {(props.blok.sansSuper || props.blok.serifSuper || props.blok.headline || props.blok.sansSub) &&
              <FlexCell className='su-text-center su-text-white'>
                {props.blok.sansSuper &&
                  <p className='su-max-w-prose su-font-semibold su-leading-display su-text-m2 su-text-shadow-md md:su-text-m4 su-mx-auto su-mb-0'>{props.blok.sansSuper}</p>
                }
                {props.blok.serifSuper &&
                  <p className='su-max-w-prose su-font-serif su-leading-display su-text-m1 md:su-text-m2 su-text-shadow su-mx-auto su-mb-05em'>{props.blok.serifSuper}</p>
                }
                {props.blok.headline &&
                  <Heading level={1}
                           font='serif'
                           weight='bold'
                           className={`su-leading-tight su-tracking-normal su-text-shadow-lg su-mb-02em ${headlineSize}`}
                  >
                    {props.blok.headline}
                  </Heading>
                }
                {props.blok.sansSub &&
                  <p className='su-max-w-prose su-mx-auto su-text-20 md:su-text-m1 su-leading-display su-text-shadow su-mx-auto su-mb-0'>{props.blok.sansSub}</p>
                }
              </FlexCell>
            }
            {numCta > 0 &&
              <FlexCell className='su-rs-mt-4'>
                <CreateBloks blokSection={props.blok.cta}/>
              </FlexCell>
            }
            <FlexCell
              grow={false}
              className='su-text-center su-text-white su-font-semibold su-rs-mt-5 su-font-serif su-font-regular su-text-19 md:su-text-22'
            >
              <p className='su-mb-02em'>Scroll to explore</p>
              <a href={`#${props.blok.scrollTo}`} className='su-block su-mx-auto su-w-fit su-group'>
                <SrOnlyText srText='Jump to main content' />
                <ArrowDownIcon
                  className='su-transition-colors su-text-digital-red-xlight su-w-40 su-h-40 su-p-6 su-border-2 su-border-cardinal-red su-rounded-full group-hover:su-text-white group-focus:su-text-white group-hover:su-bg-cardinal-red group-focus:su-bg-cardinal-red'
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
