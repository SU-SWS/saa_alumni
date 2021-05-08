import SbEditable from 'storyblok-react';
import React from 'react';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';
import { Heading, SrOnlyText } from 'decanter-react';

const PerkCardView = (props) => {

  // Destructure props
  const {
    blok: {
      image: {
        filename
      } = {},
      imageFocus,
      isNew,
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

  let newTab = '';

  if (isNew) {
    newTab =
      <div className='su-absolute su-top-0 su-left-0 su-rs-ml-2 su-pr-8 su-pl-9 su-pb-[1.5em] su-pt-12 su-bg-digital-red-light su-text-white su-font-semibold su-leading-none su-text-vertical-lr su-transform su-rotate-180 su-shadow-sm'>
        New
        <SrOnlyText srText=' perk' />
      </div>
  }

  return (
    <SbEditable content={blok}>
      <article className='perk-card su-relative su-rs-pb-3 su-break-words su-basefont-23 su-max-w-500 su-border su-border-solid su-border-black-90'>
        <div className='perk-card-image-wrapper su-relative su-aspect-w-4 su-aspect-h-3'>
          {filename?.startsWith('http') &&
            <figure className='su-overflow-hidden su-w-full su-h-full'>
              <CardImage
                filename={filename}
                imageFocus={imageFocus}
                className='su-w-full su-h-full su-object-cover'
                loading='lazy'
              />
            </figure>
          }
          <div className={`su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-b su-from-transparent su-to-saa-black`} aria-hidden='true' />
        </div>
        {newTab}
        <SbLink
          link={perkPageLink}
          classes='su-stretched-link su-text-white hocus:su-text-white su-no-underline hocus:su-underline su-underline-custom !su-underline-digital-red-xlight'
        >
          <Heading level={headingLevel ?? 3} font='serif' size={1} tracking='normal' className='su-relative su-mt-[-3em] su-rs-px-2'>{title}</Heading>
        </SbLink>
        <p className='su-relative su-text-black-20 su-card-paragraph su-mb-0 su-rs-px-2'>{intro}</p>
        <a href='https://google.com' className='su-relative su-inline-block su-z-10 su-rs-mt-0 su-rs-ml-2 su-no-underline hocus:su-underline su-text--m1'>Test link</a>
      </article>
    </SbEditable>
  );
};
export default PerkCardView;
