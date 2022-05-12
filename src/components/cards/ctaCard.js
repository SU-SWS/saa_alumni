import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Heading } from '../simple/Heading';
import { SrOnlyText } from '../accessibility/SrOnlyText';
import SbLink from '../../utilities/sbLink';
import HeroIcon from '../simple/heroIcon';

const CtaCard = ({
  blok: { headline, headingLevel = 3, linkText, link, srText },
  blok,
}) => (
  <SbEditable content={blok}>
    <div
      className={dcnb(
        'cta-card su-w-full su-relative su-transition-colors su-bg-digital-red su-text-white hover:su-bg-cardinal-red-xdark focus-within:su-bg-cardinal-red-xdark su-basefont-23 su-break-words su-rs-py-3 su-rs-px-2 su-flex su-flex-col su-justify-end'
      )}
    >
      <Heading
        level={headingLevel}
        size={2}
        className={dcnb(
          'su-mb-0 su-text-white hocus:su-text-white hocus:su-no-underline'
        )}
      >
        {headline}
      </Heading>
      {link && (
        <SbLink
          link={link}
          classes="su-block su-stretched-link su-group su-transition-colors su-font-regular su-no-underline su-underline-offset su-text-white hocus:su-underline hocus:su-text-white su-rs-mt-3"
        >
          {linkText}
          {srText && <SrOnlyText>{` ${srText}`}</SrOnlyText>}
          <HeroIcon
            iconType={link.linktype === 'url' ? 'external' : 'arrow-right'}
            className="su-relative su-inline-block su-text-white group-hover:su-text-white group-focus:su-text-white"
            isAnimate
          />
        </SbLink>
      )}
    </div>
  </SbEditable>
);

export default CtaCard;
