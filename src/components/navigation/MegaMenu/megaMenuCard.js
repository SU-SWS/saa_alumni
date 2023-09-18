import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './megaMenuCard.styles';

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
      <SbLink link={link} classes="su-no-underline su-group">
        {filename != null && (
          <div className={styles.cardImageWrapper}>
            <CardImage
              {...props}
              filename={filename}
              size="vertical"
              loading="lazy"
              imageFocus="center"
              className={styles.cardImageStyles}
            />
          </div>
        )}
        <div className={styles.cardContent}>
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
