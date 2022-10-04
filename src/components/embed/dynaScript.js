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

  const showForm = () => {
    setDisplay(true);
  };

  const scrollTop = () => {
    const formLocation = document.getElementById('su-gg-embed');
    window.scrollTo({
      top: formLocation.scrollTop,
      left: formLocation.scrollLeft,
    });
  };

  // When the component mounts load the script.
  useEffect(() => {
    let mounted = true;
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      if (mounted) {
        setScriptLoaded(true);

        // Once GiveGab form has completed rendering, display form
        script.addEventListener('widgetRenderEnd', showForm);
        // Once GiveGab form has been prompted to the next form page, bring user back to the top of the form
        script.addEventListener('widgetPageChange', scrollTop);
        // Once GiveGab form has successfully submitted, bring user back to the top of the form
        // script.addEventListener('widgetComplete', scrollTop);
      }
    };
    script.onerror = () => {
      setScriptError(true);
    };

    scriptRef.current.appendChild(script);

    return () => {
      mounted = false;
      script.removeEventListener('widgetRenderEnd', showForm);
      script.removeEventListener('widgetPageChange', scrollTop);
      // script.removeEventListener('widgetComplete', scrollTop);
    };
  }, [src, setScriptLoaded, scriptRef]);

  return (
    <div id="su-embed">
      {!display && (
        <div className="su-flex su-flex-row">
          <ClipLoader color="#00BFFF" height={50} width={50} />
          <p className="su-ml-03em">Loading form...</p>
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
        className={display ? 'su-block' : 'su-hidden'}
      />
    </div>
  );
};

export default DynaScript;
