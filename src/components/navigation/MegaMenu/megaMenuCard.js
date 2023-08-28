import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';

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
        <div className={`su-text-white su-bg-${backgroundColor}`}>
          <h3 className="su-serif su-bold">{headline}</h3>
          <p
            className={`su-after-bg-white su-after-bg-hocus-white su-mb-none
          ${link.linktype === 'url' ? 'su-link--external' : 'su-link--action'}`}
          >
            {ctaText}
          </p>
        </div>
      </SbLink>
    </article>
  </SbEditable>
);

export default MegaMenuCard;
