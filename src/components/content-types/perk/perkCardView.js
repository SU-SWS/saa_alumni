import SbEditable from 'storyblok-react';
import React from 'react';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';
import { Heading } from 'decanter-react';

const PerkCardView = (props) => {
  // Destructure props
  const {
    blok: {
      image: {
        filename
      },
      imageFocus,
      isNew,
      title,
      headingLevel,
      intro,
    },
    blok
  } = props;

  const perkPageLink = { linktype: 'story', url: props.storyLink + '/' };

  return (
    <SbEditable content={props.blok}>
      <article className='perk-card su-relative su-max-w-500 su-border su-border-solid su-border-black-90'>
        <div className='perk-card-image-wrapper su-relative'>
          {filename?.startsWith('http') &&
            <figure className='su-overflow-hidden su-w-full su-h-full'>
              <CardImage
                filename={filename}
                imageFocus={imageFocus}
              />
            </figure>
          }
          <div className={`su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-b su-from-transparent su-to-saa-black`} aria-hidden='true' />
        </div>
        <div className='perk-card-content su-relative su--mt-[1em]'>
          <SbLink
            link={perkPageLink}
            classes='su-text-white hocus:su-text-white su-no-underline hocus:su-underline su-custom-underline'
          >
            <Heading level={headingLevel ?? 3} font='serif' size={2}>{title}</Heading>
          </SbLink>
          <p className='su-text-black-20 su-card-paragraph'>{intro}</p>
        </div>
      </article>
    </SbEditable>
  );
};
export default PerkCardView;
