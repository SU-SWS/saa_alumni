import React from 'react';
import SbEditable from 'storyblok-react';
import RichTextRenderer from '../../utilities/richTextRenderer';
import hasRichText from '../../utilities/hasRichText';
import { SAACtaLink } from '../cta/SAACtaLink';
import { SAALinkButton } from '../cta/SAALinkButton';

const GiveGabFailureMessage = (props) => {
  const {
    blok: { body, buttonToggle, buttonText = 'Try again', helpTicketLink },
    blok,
  } = props;
  return (
    <SbEditable content={blok}>
      {hasRichText(body) && (
        <RichTextRenderer wysiwyg={body} className="su-text-center" />
      )}
      {buttonToggle && (
        <SAALinkButton
          link="/"
          className="su-mb-27 su-bg-digital-red su-border-digital-red hocus:su-bg-digital-red-light hocus:su-border-digital-red-light"
        >
          {buttonText}
        </SAALinkButton>
      )}
      <p className="su-mb-0 su-text-19 md:su-text-21 xl:su-text-23 su-flex">
        If the problem persists,{' '}
        <SAACtaLink
          link={helpTicketLink}
          trailingIcon="external"
          linkText="please submit a help ticket"
          textColor="bright-red-hover-white"
          className="su-font-normal"
        />
      </p>
    </SbEditable>
  );
};

export default GiveGabFailureMessage;
