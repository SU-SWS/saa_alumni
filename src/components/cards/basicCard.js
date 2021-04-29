import React from 'react';
import SbEditable from 'storyblok-react';
import CardImage from '../media/cardImage';
import CreateBloks from '../../utilities/createBloks';
import getNumBloks from '../../utilities/getNumBloks';
import { FlexBox, Heading } from 'decanter-react';
import { dcnb } from 'cnbuilder';
import { borderColors } from '../../utilities/dataSource';

const BasicCard = ({
  blok: {
    cta,
    borderColor,
    isRound,
    isMinimal,
    isLightText,
    isBigHeadline,
    align,
    image: {
      filename
    },
    imageFocus,
    headline,
    headingLevel,
    text
  },
  blok
}) => {
  const numCta = getNumBloks(cta);

  let wrapperClasses = 'su-bg-white su-text-black su-border su-border-solid su-border-transparent-black su-shadow'
  let imageClasses;

  // Basic card image has aspect ratio 4x3 for non-round option
  let imageWrapperClasses = 'su-aspect-w-4 su-aspect-h-3';

  // Option to display image as round thumbnail with colored border
  borderColor = borderColors[borderColor] ?? borderColors['digital-red'];

  if (isRound) {
    wrapperClasses = dcnb('su-rs-pt-3', wrapperClasses);
    imageWrapperClasses = dcnb('su-w-[14rem] su-h-[14rem] su-rs-ml-2 su-rounded-full su-border-[7px] su-border-solid su-overflow-hidden', borderColor);
    imageClasses = 'su-w-full su-h-full';
  }

  // Option to use "minimal" card variant
  let bodyPadding = 'su-rs-px-2 su-rs-pt-2 su-rs-pb-4'

  if (isMinimal) {
    wrapperClasses = '';
    bodyPadding = 'su-rs-pt-2';
    imageWrapperClasses = dcnb(imageWrapperClasses, {'su-rs-ml-2': false});
  }

  // Option to use light text
  if (isLightText) {
    wrapperClasses = 'su-bg-transparent su-text-white';
  }

  // Option to make headline font larger
  let headlineSize = 'su-type-2';

  if (isBigHeadline) {
    headlineSize = 'su-type-3';
  }

  // Content alignment including image and CTA, default is left-align
  // This setting overrides the alignment option in the nested CTA
  let bodyAlign = 'su-items-start';

  if (align === 'center') {
    wrapperClasses = dcnb(wrapperClasses, 'children:su-mx-auto su-text-center');
    bodyAlign = 'su-items-center';
  }

  return (
    <SbEditable content={blok}>
      <div className={dcnb('basic-card su-max-w-600 su-basefont-23', wrapperClasses)}>
        {filename?.startsWith('http') && (
          <div className={imageWrapperClasses} aria-hidden='true'>
            <CardImage
              filename={filename}
              size={isRound ? 'thumb' : 'vertical'}
              imageFocus={imageFocus}
              className={dcnb('su-object-cover', imageClasses)}
              loading='lazy'
            />
          </div>
        )}
        <FlexBox direction={'col'} className={dcnb('card-body', bodyPadding, bodyAlign)}>
          <Heading
            level={headingLevel ?? 3}
            className={dcnb('su-font-serif su-bold su-mb-0', headlineSize)}
          >
            {headline}
          </Heading>
          {text &&
            <p className='su-card-paragraph su-rs-mt-neg1 su-mb-0'>{text}</p>
          }
          {numCta > 0 &&
            <div className='su-rs-mt-2'>
              <CreateBloks blokSection={cta} />
            </div>
          }
        </FlexBox>
      </div>
    </SbEditable>
  );
};

export default BasicCard;
