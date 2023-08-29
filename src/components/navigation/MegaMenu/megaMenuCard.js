import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';

const MegaMenuCard = (
  {
    blok: {
      link,
      link: { linktype },
      image: { filename },
      backgroundColor,
      headline,
      ctaText,
    },
    blok,
  },
  props
) => (
  <SbEditable content={blok}>
    <article className="su-w-fit">
      <SbLink link={link} classes="su-no-underline su-group">
        {filename != null && (
          <div className="su-overflow-hidden su-aspect-[3/2] ">
            <CardImage
              {...props}
              filename={filename}
              size="vertical"
              loading="lazy"
              imageFocus="center"
              className="su-w-full su-object-cover su-w-full su-h-full su-transition-transform su-transform-gpu group-hover:su-scale-[1.03] group-focus-within:su-scale-[1.03] su-object-center"
            />
          </div>
        )}
        <div className="su-text-white su-rs-px-2 su-rs-pt-2 su-rs-pb-3 su-bg-digital-red group-hover:su-bg-cardinal-red group-focus:su-bg-cardinal-red">
          <Heading size="2" level={3} font="serif" weight="bold">
            {headline}
          </Heading>
          <p className="su-mb-0">
            {ctaText}
            <HeroIcon
              className="su-inline-block"
              isAnimate
              iconType={link.linktype === 'url' ? 'external' : 'chevron-right'}
            />
          </p>
        </div>
      </SbLink>
    </article>
  </SbEditable>
);

export default MegaMenuCard;
