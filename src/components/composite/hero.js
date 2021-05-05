import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, FlexBox, FlexCell, Heading, SrOnlyText } from 'decanter-react';
import FullWidthImage from '../media/fullWidthImage';
import CreateBloks from '../../utilities/createBloks';
import { ArrowDownIcon } from '@heroicons/react/outline';
import getNumBloks from '../../utilities/getNumBloks';

const Hero = ({
  blok: {
    isSmallHeadline,
    isDarkGradient,
    imageFocus,
    cta,
    image: {
      filename
    },
    sansSuper,
    sansSub,
    serifSuper,
    headline,
    headingLevel,
    scrollTo
  },
  blok
}) => {
  let headlineSize = 'su-text-m4 md:su-text-m6 lg:su-text-m8';

  if (isSmallHeadline) {
    headlineSize = 'su-text-m3 md:su-text-m5 lg:su-text-m7';
  }

  let gradientFrom = 'su-from-transparent';

  if (isDarkGradient) {
    gradientFrom = 'su-from-transparent-black-20';
  }

  let numCta = getNumBloks(cta);

  return (
    <SbEditable content={blok}>
      <Container className={`su-relative su-bg-saa-black`} width='full'>
        {filename?.startsWith('http') && (
          <figure className='su-absolute su-top-0 su-overflow-hidden su-w-full su-h-full'>
            <FullWidthImage
              filename={filename}
              imageFocus={imageFocus}
              className='su-w-full su-h-full su-object-cover'
              loading='eager'
            />
          </figure>
        )}
        <div className={`su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-b ${gradientFrom} su-to-saa-black`} aria-hidden='true' />
        <Container className='su-relative su-rs-pt-9 su-rs-pb-4'>
          <FlexBox direction='col' className='lg:su-mt-[190px]'>
            {(sansSuper || serifSuper || headline || sansSub) &&
              <FlexCell className='su-text-center su-text-white'>
                {sansSuper &&
                  <p className='su-max-w-prose su-font-semibold su-leading-display su-text-m2 su-text-shadow-md md:su-text-m4 su-mx-auto su-mb-0'>{sansSuper}</p>
                }
                {serifSuper &&
                  <p className='su-max-w-prose su-font-serif su-leading-display su-text-m1 md:su-text-m2 su-text-shadow su-mx-auto su-mb-05em'>{serifSuper}</p>
                }
                {headline &&
                  <Heading level={headingLevel ?? 1}
                           font='serif'
                           weight='bold'
                           className={`su-leading-tight su-tracking-normal su-text-shadow-lg su-mb-02em ${headlineSize}`}
                  >
                    {headline}
                  </Heading>
                }
                {sansSub &&
                  <p className='su-max-w-prose su-text-20 md:su-text-m1 su-leading-display su-text-shadow su-mx-auto su-mb-0'>{sansSub}</p>
                }
              </FlexCell>
            }
            {numCta > 0 &&
              <FlexCell className={sansSub ? 'su-rs-mt-4' : ''}>
                <CreateBloks blokSection={cta}/>
              </FlexCell>
            }
            <FlexCell
              grow={false}
              className='su-text-center su-text-white su-rs-mt-5 su-font-serif su-font-regular su-text-19 md:su-text-22'
            >
              <p className='su-mb-02em'>Scroll to explore</p>
              <a href={`#${scrollTo}`} className='su-block su-mx-auto su-w-fit su-group'>
                <SrOnlyText srText='Jump to main content' />
                <ArrowDownIcon
                  className='su-transition-colors su-text-digital-red-xlight su-w-40 su-h-40 su-p-6 su-border-2 su-border-cardinal-red su-rounded-full group-hocus:su-text-white group-hocus:su-bg-cardinal-red'
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
