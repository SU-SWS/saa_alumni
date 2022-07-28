import React from 'react';
import SbEditable from 'storyblok-react';
import { useLocation } from '@reach/router';
import { dcnb } from 'cnbuilder';
import { SAALinkButton } from '../cta/SAALinkButton';
import { Heading } from '../simple/Heading';
import SbLink from '../../utilities/sbLink';
import HeroIcon from '../simple/heroIcon';

const GiveGabErrorMessage = (props) => {
  const {
    blok: {
      heading,
      body = 'Sorry, we are experiencing technical difficulties. Please try refreshing your browser or return to this form later. Thank you!',
      buttonToggle,
      buttonText = 'Try again',
      helpTicketLink,
    },
    blok,
    isDark,
  } = props;
  const location = useLocation();
  const linkStyle = isDark
    ? 'hocus:su-border-b hocus:su-border-digital-red-xlight su-text-white hocus:su-text-white group-hover:su-text-white group-focus:su-text-white'
    : 'su-underline-offset-[3px] hocus:su-underline su-text-digital-red-light group-hover:su-text-cardinal-red group-focus:su-text-cardinal-red';
  const iconStyle = isDark
    ? 'su-text-digital-red-xlight'
    : 'su-text-digital-red-light';

  return (
    <SbEditable content={blok}>
      <div className="su-text-center su-flex su-flex-col su-items-center">
        <Heading level={2} size={2} weight="semibold">
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
        <p className="su-mb-0 su-text-18">
          If the problem persists,{' '}
          <SbLink
            link={helpTicketLink}
            classes={dcnb(
              'su-inline su-group su-transition-colors su-no-underline',
              linkStyle
            )}
          >
            please submit a help ticket{' '}
            <HeroIcon
              iconType="external"
              className={dcnb('su-inline', iconStyle)}
              isAnimate
            />
          </SbLink>
        </p>
      </div>
    </SbEditable>
  );
};

export default GiveGabErrorMessage;
