import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, Heading } from 'decanter-react';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../utilities/createBloks';
import RichTextRenderer from '../../utilities/richTextRenderer';
import getNumBloks from '../../utilities/getNumBloks';
import {
  largePaddingTop,
  largePaddingBottom,
  bgTextColorPairs,
  superheadStyles,
} from '../../utilities/dataSource';
import SbLink from '../../utilities/sbLink';
import hasRichText from '../../utilities/hasRichText';
import HeroIcon from '../simple/heroIcon';

const Section = ({
  blok: {
    superhead,
    superLink,
    title,
    headingLevel,
    intro,
    cta,
    content,
    isLeftAlign,
    superheadStyle = 'gradient-underline',
    titleSize,
    isSrOnlyTitle,
    isLessHeaderSpacing,
    bgColor = 'white',
    spacingTop,
    spacingBottom,
    id,
  },
  blok,
}) => {
  const numCta = getNumBloks(cta);
  const hasHeader =
    (title && !isSrOnlyTitle) || hasRichText(intro) || superhead;

  const sectionBgColor = bgTextColorPairs[bgColor];
  let alignment = 'su-text-center';
  let bodyAlign = 'su-mx-auto';
  let headlineAlign = 'su-mx-auto';

  let superLinkStyle = superheadStyles[superheadStyle].light;
  let backIconColor =
    'su-text-digital-red-light group-hocus:su-text-cardinal-red';

  let isDarkSection = false;

  if (bgColor === 'black') {
    superLinkStyle = superheadStyles[superheadStyle].dark;
    backIconColor = 'su-text-digital-red-xlight group-hocus:su-text-white';
    isDarkSection = true;
  }

  let headlineSize = 'su-type-5';

  if (titleSize === 'sm') {
    headlineSize = 'su-type-3';
  } else if (titleSize === 'md') {
    headlineSize = 'su-type-4';
  }

  let headerSpacing = 'su-rs-mb-5';

  if (isLessHeaderSpacing) {
    headerSpacing = 'su-rs-mb-3';
  }

  if (isLeftAlign) {
    alignment = 'su-text-left';
    bodyAlign = '';
    headlineAlign = 'su-ml-0';
  }

  const paddingTop = largePaddingTop[spacingTop];
  const paddingBottom = largePaddingBottom[spacingBottom];

  return (
    <SbEditable content={blok}>
      <section
        className={dcnb(
          'section su-basefont-23',
          sectionBgColor,
          paddingTop,
          paddingBottom
        )}
        id={id || ''}
      >
        {hasHeader && (
          <header className={dcnb('su-cc', alignment, headerSpacing)}>
            {superhead && superLink?.cached_url && (
              <SbLink
                link={superLink}
                classes={dcnb(
                  'su-group su-inline-block su-rs-mb-6 su-pb-6 su-no-underline su-transition-colors',
                  superLinkStyle
                )}
              >
                {superheadStyle === 'red-back-link' && (
                  <HeroIcon
                    iconType="arrow-left"
                    className={dcnb('su-inline-block', backIconColor)}
                    isAnimate
                  />
                )}
                {superhead}
              </SbLink>
            )}
            {superhead && !superLink?.cached_url && (
              <span className="su-block su-font-semibold su-rs-mb-6">
                {superhead}
              </span>
            )}
            {title && (
              <Heading
                level={parseInt(headingLevel, 10) || 2}
                font="serif"
                weight="bold"
                className={dcnb(
                  'su-mb-02em su-max-w-800',
                  headlineAlign,
                  headlineSize
                )}
                srOnly={isSrOnlyTitle}
              >
                {title}
              </Heading>
            )}
            {hasRichText(intro) && (
              <div
                className={dcnb('su-big-paragraph su-max-w-prose', bodyAlign)}
              >
                <RichTextRenderer
                  wysiwyg={intro}
                  className="children:su-leading-display"
                  isDark={isDarkSection}
                />
              </div>
            )}
          </header>
        )}
        <CreateBloks blokSection={content} isDark={isDarkSection} />
        {numCta > 0 && (
          <Container width="site" className="su-rs-mt-6">
            <CreateBloks blokSection={cta} />
          </Container>
        )}
      </section>
    </SbEditable>
  );
};

export default Section;
