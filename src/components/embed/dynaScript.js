/* eslint-disable no-alert */
import React, { useRef, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { SAACtaLink } from '../cta/SAACtaLink';
import { SAALinkButton } from '../cta/SAALinkButton';
import { Heading } from '../simple/Heading';

/**
 * Dynamically load a script after the component has been mounted.
 *
 * @param {*} props
 */
const DynaScript = ({
  errorText = 'Sorry, we are experiencing technical difficulties. Please try refreshing your browser or return to this form later. Thank you!',
  src,
  id,
  ...props
}) => {
  const scriptRef = useRef();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

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
      {scriptError && (
        <div className="su-flex su-flex-col su-items-center">
          <Heading level={2} size={2} weight="regular">
            Something went wrong.
          </Heading>
          <p className="su-big-paragraph">
            Vestibulum ullamcorper mauris at ligula.
          </p>
          <SAALinkButton
            link="/"
            className="su-mb-27 su-bg-digital-red su-border-digital-red hocus:su-bg-digital-red-light hocus:su-border-digital-red-light"
          >
            Try again
          </SAALinkButton>
          <p className="su-mb-0 su-text-19 md:su-text-21 xl:su-text-23 su-flex">
            If the problem persists,{' '}
            <SAACtaLink
              link="/"
              trailingIcon="external"
              linkText="please submit a help ticket"
              textColor="bright-red-hover-white"
              className="su-font-normal"
            />
          </p>
        </div>
      )}
    </>
  );
};

export default DynaScript;
