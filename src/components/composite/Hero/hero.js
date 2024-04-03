import React from 'react';
import SbEditable from 'storyblok-react';
import { ArrowDownIcon } from '@heroicons/react/outline';
import { dcnb } from 'cnbuilder';
import { FlexBox } from '../../layout/FlexBox';
import { Container } from '../../layout/Container';
import { SrOnlyText } from '../../accessibility/SrOnlyText';
import FullWidthImage from '../../media/fullWidthImage';
import CreateBloks from '../../../utilities/createBloks';
import getNumBloks from '../../../utilities/getNumBloks';
import { heroGradient } from '../../../utilities/dataSource';
import * as styles from './hero.styles';

const Hero = ({
  blok: {
    headlineSize,
    isDarkGradient,
    heroGradient: gradientProp,
    imageFocus,
    cta,
    image: { filename, focus } = {},
    sansSuper,
    sansSub,
    serifSuper,
    headline,
    isHideScroll,
  },
  blok,
}) => {
  let heroHeadlineSize = 'su-type-7 su-mx-auto su-max-w-900';

  if (headlineSize === 'large') {
    heroHeadlineSize = 'su-type-8';
  } else if (headlineSize === 'small') {
    heroHeadlineSize = 'su-type-6 su-mx-auto su-max-w-900';
  } else if (headlineSize === 'x-small') {
    heroHeadlineSize = 'su-type-4';
  }

  let gradient = heroGradient[gradientProp];

  if (isDarkGradient) {
    gradient = 'su-to-black-true/20';
  }

  let blackText;
  if (gradientProp === 'white') {
    blackText = 'xs:su-text-black-true';
  }

  const numCta = getNumBloks(cta);

  return (
    <SbEditable content={blok}>
      <Container className={styles.container} width="full">
        {filename?.startsWith('http') && (
          <figure className={styles.imgWrapper}>
            <FullWidthImage
              filename={filename}
              imageFocus={imageFocus}
              smartFocus={focus}
              className={styles.img}
              loading="eager"
            />
          </figure>
        )}
        <div
          className={styles.gradientOverlay({ gradient })}
          aria-hidden="true"
        />
        <Container
          className={`su-relative su-rs-pt-9
          ${isHideScroll ? 'su-rs-pb-8' : 'su-rs-pb-4'}`}
        >
          <FlexBox direction="col" className="lg:su-mt-[19rem]">
            {(sansSuper || serifSuper || headline || sansSub) && (
              <div className={styles.textWrapper({ blackText })}>
                {sansSuper && (
                  <span className={styles.sansSuper}>{sansSuper}</span>
                )}
                {serifSuper && (
                  <span className={styles.serifSuper({ blackText })}>
                    {serifSuper}
                  </span>
                )}
                {headline && (
                  <span
                    className={dcnb(
                      styles.headline({ blackText }),
                      heroHeadlineSize
                    )}
                  >
                    {headline}
                  </span>
                )}
                {sansSub && (
                  <p className={styles.sansSub({ blackText })}>{sansSub}</p>
                )}
              </div>
            )}
            {numCta > 0 && (
              <div className={sansSub ? 'su-rs-mt-4' : ''}>
                <CreateBloks blokSection={cta} />
              </div>
            )}
            {!isHideScroll && (
              <div className={styles.scroll({ blackText })}>
                <p className="su-mb-02em">Scroll to explore</p>
                <a href="#page-title" className={styles.pageTitleLink}>
                  <SrOnlyText>Jump to main content</SrOnlyText>
                  <ArrowDownIcon
                    className={styles.arrowDownIcon}
                    aria-hidden="true"
                  />
                </a>
              </div>
            )}
          </FlexBox>
        </Container>
      </Container>
    </SbEditable>
  );
};

export default Hero;
