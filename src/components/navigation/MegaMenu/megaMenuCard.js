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
    <article className="saa-mega-nav__card">
      <SbLink link={link} classes="su-no-underline">
        {filename != null && (
          <CardImage
            {...props}
            filename={filename}
            size="vertical"
            loading="lazy"
            width="600"
            height="400"
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
