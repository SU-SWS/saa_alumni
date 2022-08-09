import React, { useRef, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import GiveGabErrorMessage from './giveGabErrorMessage';

/**
 * Dynamically load a script after the component has been mounted.
 *
 * @param {*} props
 */
const DynaScript = ({ errorBlok, src, id, ...props }) => {
  const scriptRef = useRef();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [display, setDisplay] = useState(false);
  const isDark = true;

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
  }, [src, setScriptLoaded, scriptRef, setDisplay, display]);

  let formDisplay = 'su-hidden';
  const displayForm = () => {
    setDisplay(true);
    formDisplay = 'su-block';
  };

  return (
    <>
      {!scriptLoaded && !scriptError && (
        <div className="su-flex su-flex-row">
          <ClipLoader color="#00BFFF" height={50} width={50} />
          <p className="su-pl-03em">Loading form...</p>
          <noscript>
            Sorry, but you must have Javascript enabled to use the form.
          </noscript>
        </div>
      )}
      {scriptError && errorBlok && (
        <GiveGabErrorMessage blok={errorBlok} isDark={isDark} />
      )}
      <div
        ref={scriptRef}
        aria-live="polite"
        aria-busy={!scriptLoaded}
        id={id}
        className={formDisplay}
      />
    </>
  );
};

export default DynaScript;
