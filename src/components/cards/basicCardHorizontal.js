import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Grid as DrGrid } from 'decanter-react';
import CardImage from '../media/cardImage';
import CircularImage from '../media/circularImage';
import BasicCardContent from './basicCardContent';

const BasicCardHorizontal = ({
  blok: {
    cta,
    borderColor,
    isRound,
    isMinimal,
    isBigHeadline,
    image: { filename, focus } = {},
    imageFocus,
    headline,
    headingLevel,
    text,
  },
  blok,
  isDark,
}) => {
  // Default wrapper classes for white, non-minimal cards
  let wrapperClasses =
    'su-bg-white su-text-black su-border su-border-solid su-border-black-30-opacity-40 su-bg-clip-padding su-shadow-sm su-rs-pt-2 su-rs-px-2 su-rs-pb-3';

  // Basic card image has aspect ratio 3x2 for non-round option
  let cardImage = (
    <div className="su-aspect-w-3 su-aspect-h-2" aria-hidden="true">
      <CardImage
        filename={filename}
        size="vertical"
        imageFocus={imageFocus}
        smartFocus={focus}
        loading="lazy"
        width="600"
        height="400"
      />
    </div>
  );

  if (isRound && filename) {
    cardImage = (
      <CircularImage
        borderColor={borderColor}
        filename={filename}
        smartFocus={focus}
        loading="lazy"
        width="126"
        height="126"
      />
    );
  }

  if (isMinimal) {
    wrapperClasses = '';
  }

  let cardGrid;

  if (filename) {
    cardGrid = 'md:su-grid-cols-2 print:su-grid-cols-2';

    if (isRound) {
      cardGrid =
        'md:su-grid-flow-col print:su-grid-flow-col md:su-grid-cols-auto-1fr print:su-grid-cols-auto-1fr';
    }
  }

  return (
    <SbEditable content={blok}>
      <DrGrid
        gap
        className={dcnb(
          'basic-card-horizontal su-items-start su-gap-x-xl su-w-full su-basefont-23 su-break-words',
          wrapperClasses,
          cardGrid
        )}
      >
        {filename?.startsWith('http') && cardImage}
        <BasicCardContent
          headline={headline}
          headingLevel={headingLevel}
          isBigHeadline={isBigHeadline}
          isDark={isDark && isMinimal}
          text={text}
          cta={cta}
          className={dcnb(
            'card-body',
            `${isRound && filename ? '' : 'su-mt-[-0.3em]'}`
          )}
        />
      </DrGrid>
    </SbEditable>
  );
};

export default BasicCardHorizontal;
