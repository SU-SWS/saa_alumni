import React, { useRef, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useLocation } from '@reach/router';
import { SAACtaLink } from '../cta/SAACtaLink';
import { SAALinkButton } from '../cta/SAALinkButton';
import SbLink from '../../utilities/sbLink';
import HeroIcon from '../simple/heroIcon';
import { Heading } from '../simple/Heading';

/**
 * Dynamically load a script after the component has been mounted.
 *
 * @param {*} props
 */
const DynaScript = ({
  heading,
  buttonToggle,
  buttonText,
  errorText = 'Sorry, we are experiencing technical difficulties. Please try refreshing your browser or return to this form later. Thank you!',
  helpTicketLink,
  src,
  id,
  ...props
}) => {
  const scriptRef = useRef();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const location = useLocation();

  // When the component mounts load the script.
  useEffect(() => {
    let mounted = true;
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      if (mounted) {
        setScriptLoaded(true);
      }
    };
    script.onerror = () => {
      setScriptError(true);
    };

    scriptRef.current.appendChild(script);

    return () => {
      mounted = false;
    };
  }, [src, errorText, setScriptLoaded, scriptRef]);

  return (
    <>
      <div
        ref={scriptRef}
        aria-live="polite"
        aria-busy={!scriptLoaded}
        id={id}
      />
      {!scriptLoaded && !scriptError && (
        <>
          <ClipLoader color="#00BFFF" height={50} width={50} aria-busy="true" />
          Loading...
        </>
      )}
      {scriptError && errorText && (
        <div className="su-text-center su-flex su-flex-col su-items-center">
          <Heading level={2} size={2}>
            {heading}
          </Heading>
          {errorText && (
            <p className="su-text-center su-subheading">{errorText}</p>
          )}
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
      )}
    </>
  );
};

export default DynaScript;
