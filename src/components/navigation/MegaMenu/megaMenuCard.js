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
    <article className="su-w-full">
      <SbLink link={link} classes="su-no-underline">
        {filename != null && (
          <CardImage
            {...props}
            filename={filename}
            size="vertical"
            loading="lazy"
            imageFocus="center"
            className="su-overflow-hidden su-aspect-[3/2] su-w-full"
          />
        )}
        <div
          className={`su-text-white su-rs-px-2 su-rs-pt-2 su-rs-pb-3 su-bg-${backgroundColor}`}
        >
          <Heading size="2" level={3} font="serif" weight="bold">
            {headline}
          </Heading>
          <p className="su-mb-0 su-flex su-items-center">
            {ctaText}
            <HeroIcon
              className="su-h-full"
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
