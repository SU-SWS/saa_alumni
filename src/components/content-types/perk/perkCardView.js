import SbEditable from 'storyblok-react';
import React from 'react';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';
import TabLabel from '../../simple/tabLabel';
import { Heading } from 'decanter-react';
import { ArrowRightIcon } from '@heroicons/react/solid';

const PerkCardView = (props) => {

  // Destructure props
  const {
    blok: {
      image: {
        filename
      } = {},
      imageFocus,
      isNew,
      type,
      title,
      headingLevel,
      intro,
      externalUrl
    },
    blok,
    storyLink
  } = props;

  // Default link is the internal link of the perk content page
  let perkPageLink = { linktype: 'story', url: storyLink + '/' };

  // Link to external URL instead if it is provided
  if (externalUrl) {
    perkPageLink = { linktype: 'url', url: externalUrl };
  }

  let perkType = 'Alumni perk';

  if (type === 'benefit') {
    perkType = 'Member benefit';
  }

  return (
    <SbEditable content={blok}>
      <article className='su-group perk-card su-relative su-flex su-flex-col su-bg-saa-black su-rs-pb-3 su-break-words su-basefont-23 su-max-w-500 su-border su-border-solid su-border-black'>
        <div className='perk-card-image-wrapper su-relative su-mb-[-3em] su-aspect-w-4 su-aspect-h-3'>
          {filename?.startsWith('http') &&
            <figure className='su-overflow-hidden su-w-full su-h-full'>
              <CardImage
                filename={filename}
                imageFocus={imageFocus}
                className='su-w-full su-h-full su-object-cover su-transition-transform su-transform-gpu group-hover:su-scale-[1.03]'
                loading='lazy'
              />
            </figure>
          }
          <div className={`su-absolute su-block su-w-full su-h-full su-top-0 su-left-0 su-bg-gradient-to-b su-from-transparent su-to-saa-black`} aria-hidden='true' />
        </div>
        <SbLink
          link={perkPageLink}
          classes='su-group su-stretched-link su-mb-08em su-rs-px-2 su-text-white hocus:su-text-white su-no-underline hocus:su-underline su-underline-custom !su-underline-digital-red-xlight'
        >
          <Heading level={headingLevel ?? 3} font='serif' size={1} tracking='normal' className='su-relative su-inline'>{title}</Heading>
          <ArrowRightIcon
            className='su-relative su-transition su-transform-gpu group-hocus:su-translate-x-02em su-inline-block su-ml-03em su--mt-03em su-text-digital-red-xlight su-w-1em su-h-1em group-hocus:su-text-white'
            aria-hidden='true'
          />
        </SbLink>
        {isNew &&
          <TabLabel text='New' srText={perkType} />
        }
        <p className='su-relative su-text-black-20 su-card-paragraph su-rs-px-2'>{intro}</p>
        <a href='https://google.com' className='su-relative su-inline-block su-w-fit su-mt-auto su-text-digital-red-xlight hocus:su-text-black-20 su-z-10 su-rs-mt-0 su-rs-ml-2 su-no-underline hocus:su-underline su-text-17 md:su-text-19 xl:su-text-20 su-font-regular su-transition-colors su-underline-custom'>{perkType}</a>
      </article>
    </SbEditable>
  );
};
export default PerkCardView;
