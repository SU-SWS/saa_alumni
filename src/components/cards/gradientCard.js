import React from 'react';
import { FlexBox, Heading, SrOnlyText } from 'decanter-react';
import { dcnb } from 'cnbuilder';
import SbLink from '../../utilities/sbLink';
import CardImage from '../media/cardImage';
import TabLabel from '../simple/tabLabel';
import { largeMarginBottom } from '../../utilities/dataSource';
import HeroIcon from '../simple/heroIcon';

const GradientCard = ({
  filename,
  focus,
  imageFocus,
  headline,
  description,
  link,
  tabText,
  headingLevel,
  orientation,
  spacingBottom,
  className,
}) => {
  let wrapperClasses = 'su-max-w-500';
  let imageWrapper = 'su-aspect-w-3 su-aspect-h-2 su-mb-[-3em]';
  let gradientDirection = 'su-bg-gradient-to-b';
  let contentWrapper = 'su-flex-grow';
  let descriptionClasses = 'su-card-paragraph';
  let marginBottom = '';

  // Horizontal card styles and options
  if (orientation === 'horizontal') {
    wrapperClasses = 'su-w-full md:su-flex-row xl:su-h-500';
    marginBottom = largeMarginBottom[spacingBottom] ?? largeMarginBottom.md;
    imageWrapper =
      'su-w-full su-mb-[-4em] md:su-mb-0 md:su-w-1/2 su-h-[60vw] sm:su-h-[50vw] lg:su-h-[40vw] xl:su-h-500 su-flex-shrink-0 su-h-full';
    gradientDirection = dcnb('md:su-bg-gradient-to-r', gradientDirection);
    contentWrapper =
      'su-w-full md:su-w-9/12 lg:su-w-7/12 lg:su-max-w-[72rem] md:su-self-end md:su-rs-pt-3 md:su-pl-0 md:su-ml-[-7em]';
    descriptionClasses = dcnb(
      'xl:su-big-paragraph xl:su-leading-snug',
      descriptionClasses
    );
  }

  return (
    <FlexBox
      direction="col"
      element="article"
      className={dcnb(
        className,
        'su-group su-relative su-w-full su-overflow-hidden su-bg-saa-black su-break-words su-basefont-23 su-border su-border-solid su-border-black su-backface-hidden',
        wrapperClasses,
        marginBottom
      )}
    >
      <div
        className={dcnb('su-relative su-overflow-hidden', imageWrapper)}
        aria-hidden="true"
      >
        {filename?.startsWith('http') && (
          <CardImage
            filename={filename}
            smartFocus={focus}
            imageFocus={imageFocus}
            className="su-w-full su-h-full su-transition-transform su-transform-gpu group-hover:su-scale-[1.03] group-focus-within:su-scale-[1.03]"
            loading={orientation === 'horizontal' ? 'eager' : 'lazy'}
            size={orientation === 'horizontal' ? 'large_3x2' : 'vertical_3x2'}
            width={orientation === 'horizontal' ? '1200' : '600'}
            height={orientation === 'horizontal' ? '800' : '400'}
          />
        )}
        <div
          className={dcnb(
            'su-absolute su-block su-w-full su-h-full su-top-0 su-left-0 su-from-transparent su-to-saa-black su-backface-hidden',
            gradientDirection
          )}
          aria-hidden="true"
        />
      </div>
      {tabText && <TabLabel text={tabText} aria-hidden="true" />}
      <FlexBox
        direction="col"
        className={dcnb('su-rs-px-2 su-rs-pb-3', contentWrapper)}
      >
        <SbLink
          link={link}
          classes={`su-block su-stretched-link su-stretched-link-hocus-outline-black-20 su-group su-mb-06em su-text-white hocus:su-text-white su-no-underline hocus:su-underline group-hover:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight ${
            orientation === 'horizontal'
              ? 'su-type-2 md:su-type-1 lg:su-type-2 xl:su-type-3'
              : 'su-type-1'
          }`}
        >
          <Heading
            level={parseInt(headingLevel, 10) ?? 3}
            font="serif"
            tracking="normal"
            className="su-relative su-inline su-type-0"
          >
            {tabText && <SrOnlyText srText={`${tabText}: `} />}
            {headline}
          </Heading>
          <HeroIcon
            iconType={link.linktype === 'url' ? 'external' : 'arrow-right'}
            className="su-relative su-inline-block su-text-digital-red-xlight group-hocus:su-text-white"
            isAnimate
          />
        </SbLink>
        <p
          className={dcnb(
            'su-relative su-text-black-20 su-flex-grow su-mb-0',
            descriptionClasses
          )}
        >
          {description}
        </p>
      </FlexBox>
    </FlexBox>
  );
};
export default GradientCard;
