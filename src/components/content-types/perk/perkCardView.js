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
      <article className='perk-card su-relative su-basefont-23 su-max-w-400 su-border su-border-solid su-border-black-90'>
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
        <div className='perk-card-content su-relative su-mt-[-2em] su-rs-px-2 su-rs-pb-3'>
          <SbLink
            link={perkPageLink}
            classes='su-text-white hocus:su-text-white su-no-underline hocus:su-underline su-underline-custom !su-underline-digital-red-xlight'
          >
            <Heading level={headingLevel ?? 3} font='serif' size={1} tracking='normal'>{title}</Heading>
          </SbLink>
          <p className='su-text-black-20 su-card-paragraph su-mb-0'>{intro}</p>
        </div>
      </article>
    </SbEditable>
  );
};
export default PerkCardView;
