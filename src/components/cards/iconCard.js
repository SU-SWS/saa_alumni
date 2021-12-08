import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { FlexBox } from '../layout/FlexBox';
import SbLink from '../../utilities/sbLink';
import HeroIcon from '../simple/heroIcon';
import FaIcon from '../simple/faIcon';

const IconCard = ({
  blok: {
    headline,
    icon: { icon: propsIcon, type } = {},
    proFaIcon,
    isOutline,
    link,
  },
  blok,
  isDark,
}) => {
  let cardStyles = 'su-bg-white su-border-black-30-opacity-40';
  let iconColor = 'su-text-digital-red group-hocus:!su-text-digital-red-light';
  let headlineColor = 'su-text-black hocus:su-text-digital-red-light';
  let headlineIconStyles = 'su-relative su-inline-block';
  let headlineIconColor = 'su-text-black group-hocus:su-text-digital-red-light';

  // isDark prop is passed from the parent ankle component
  // If isDark is true, then the dark themed icon card will be used automatically
  if (isDark) {
    cardStyles = 'su-bg-saa-black su-border-black-90';
    iconColor =
      'su-text-digital-red-light group-hocus:su-text-digital-red-xlight';
    headlineColor = 'su-text-black-10 hocus:su-text-digital-red-xlight';
    headlineIconColor =
      'su-text-black-10 group-hocus:su-text-digital-red-xlight';
  }

  headlineIconStyles = dcnb(headlineIconStyles, headlineIconColor);

  return (
    <SbEditable content={blok}>
      <FlexBox
        direction="col"
        className={dcnb(
          'icon-card print:su-hidden su-group su-relative su-block children:su-mx-auto su-text-center sm:su-max-w-[42rem] lg:su-max-w-[50rem] xl:su-max-w-full su-w-full su-mx-auto su-rs-px-3 md:su-rs-px-1 xl:su-rs-px-3 su-rs-py-3 xl:su-rs-py-4 su-basefont-23 su-break-words su-border su-border-solid su-shadow-sm hover:su-shadow-md',
          cardStyles
        )}
      >
        <div className="su-text-m2">
          <FaIcon
            iconChoice={propsIcon}
            iconType={type}
            proFaIcon={proFaIcon}
            isOutline={isOutline}
            fixedWidth
            className={dcnb('su-mb-02em su-transition-colors', iconColor)}
          />
        </div>
        <SbLink
          classes={dcnb(
            'su-group su-stretched-link su-z-20 su-rs-mt-0 su-no-underline hocus:su-underline su-underline-offset su-type-1',
            headlineColor
          )}
          link={link}
        >
          <span className="su-block su-leading-display su-font-semibold">
            {headline}
            {link.linktype === 'url' && (
              <HeroIcon
                iconType="external"
                className={headlineIconStyles}
                isAnimate
              />
            )}
          </span>
        </SbLink>
      </FlexBox>
    </SbEditable>
  );
};

export default IconCard;
