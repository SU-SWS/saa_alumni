import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, FlexBox, Heading } from 'decanter-react';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../utilities/createBloks';
import getNumBloks from '../../utilities/getNumBloks';
import RichTextRenderer from '../../utilities/richTextRenderer';
import CircularImage from '../media/circularImage';
import {
  bgPositionVertical,
  bgTextColorPairs,
  posterGradients,
} from '../../utilities/dataSource';
import addBgImage from '../../utilities/addBgImage';
import hasRichText from '../../utilities/hasRichText';

const Poster = ({
  blok: {
    cta,
    borderColor,
    image: { filename, alt, focus } = {},
    bgImage: { filename: bgFilename } = {},
    vCrop = 'center',
    headline,
    isBigHeadline,
    headingLevel,
    text,
    isBigBodyText,
    layout,
    theme = 'white',
    gradientOption = 'digital-red-plum-black',
    id,
  },
  blok,
}) => {
  const numCta = getNumBloks(cta);
  const colorTheme = bgTextColorPairs[theme];
  const bgCrop = bgPositionVertical[vCrop];
  const bgGradient = posterGradients[gradientOption];

  let wrapperClasses;
  let imageWrapper;
  let contentWrapper;
  let bodyText = 'su-big-paragraph children:su-leading-snug';
  let headingSpacing = 'su-mb-0';

  // Option to make headline font larger
  let headlineSize = 'su-type-2';

  if (isBigHeadline) {
    headlineSize = 'su-type-4';
  }

  if (isBigBodyText) {
    bodyText = 'su-subheading';
  }

  if (layout === 'left') {
    wrapperClasses = 'su-flex su-flex-col su-justify-center md:su-flex-row';
    imageWrapper =
      'su-flex-shrink-0 su-rs-mb-2 su-mx-auto md:su-rs-mr-4 md:su-mb-0 md:su-ml-0';
    contentWrapper = 'su-items-start md:su-flex-grow';
  } else {
    wrapperClasses = 'su-flex su-flex-col su-items-center';
    contentWrapper = 'su-items-center su-text-center';
    imageWrapper = 'su-rs-mb-2';
  }

  // If text contains content, add margin bottom to heading
  if (hasRichText(text)) {
    headingSpacing = 'su-mb-04em';
  }

  return (
    <SbEditable content={blok}>
      <Container
        className={dcnb(
          'poster print:su-bg-white print:!su-bg-none print:su-text-black su-basefont-23 su-rs-pt-5 su-rs-pb-6 print:su-pt-0 print:su-pb-0 su-bg-cover su-bg-no-repeat',
          wrapperClasses,
          bgCrop,
          colorTheme
        )}
        style={addBgImage(bgFilename, bgGradient)}
        id={id || ''}
      >
        {filename?.startsWith('http') && (
          <CircularImage
            borderColor={borderColor}
            filename={filename}
            smartFocus={focus}
            className={imageWrapper}
            loading="lazy"
            alt={alt ?? ''}
            width="126"
            height="126"
          />
        )}
        <FlexBox
          direction="col"
          className={dcnb('su-max-w-700', contentWrapper)}
        >
          <Heading
            font="serif"
            weight="bold"
            level={parseInt(headingLevel, 10) || 2}
            className={dcnb(headingSpacing, headlineSize)}
          >
            {headline}
          </Heading>
          {hasRichText(text) && (
            <RichTextRenderer wysiwyg={text} className={bodyText} />
          )}
          {numCta > 0 && (
            <div className="su-rs-mt-2">
              <CreateBloks blokSection={cta} />
            </div>
          )}
        </FlexBox>
      </Container>
    </SbEditable>
  );
};

export default Poster;
