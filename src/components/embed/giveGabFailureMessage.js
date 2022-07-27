import React from 'react';
import SbEditable from 'storyblok-react';
import { useLocation } from '@reach/router';
import { SAACtaLink } from '../cta/SAACtaLink';
import { SAALinkButton } from '../cta/SAALinkButton';
import { Heading } from '../simple/Heading';
import SbLink from '../../utilities/sbLink';
import HeroIcon from '../simple/heroIcon';

const GiveGabFailureMessage = (props) => {
  const {
    blok: {
      heading,
      body = 'Sorry, we are experiencing technical difficulties. Please try refreshing your browser or return to this form later. Thank you!',
      buttonToggle,
      buttonText = 'Try again',
      helpTicketLink,
    },
    blok,
  } = props;
  const location = useLocation();
  return (
    <SbEditable content={blok}>
      <div className="su-text-center su-flex su-flex-col su-items-center">
        <Heading level={2} size={2}>
          {heading}
        </Heading>
        {body && <p className="su-text-center su-subheading">{body}</p>}
        {buttonToggle && (
          <SAALinkButton
            link={location.pathname}
            className="su-rs-mt-1 su-mb-27 su-bg-digital-red su-border-digital-red hocus:su-bg-digital-red-light hocus:su-border-digital-red-light"
          >
            {buttonText || 'Try again'}
          </SAALinkButton>
        )}
        <p className="su-mb-0 su-text-18 md:su-text-21 xl:su-text-23">
          If the problem persists,{' '}
          <SbLink
            link={helpTicketLink}
            className="su-flex su-text-digital-red-xlight group-hover:su-text-black-20 group-focus:su-text-black-20"
          >
            please submit a help ticket <HeroIcon iconType="external" />
          </SbLink>
        </p>
      </div>
    </SbEditable>
  );
};

export default GiveGabFailureMessage;
