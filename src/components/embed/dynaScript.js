import React, { useRef, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import RichTextRenderer from '../../utilities/richTextRenderer';
import hasRichText from '../../utilities/hasRichText';

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
      {scriptError && hasRichText(errorText) && (
        <RichTextRenderer wysiwyg={errorText} className="su-text-center" />
      )}
    </>
  );
};

export default DynaScript;
