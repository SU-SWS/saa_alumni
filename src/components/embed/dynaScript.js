/* eslint-disable no-alert */
import React, { useRef, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

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
      alert(errorText);
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
      {!scriptLoaded && (
        <>
          <ClipLoader color="#00BFFF" height={50} width={50} aria-busy="true" />
          Loading...
        </>
      )}
    </>
  );
};

export default DynaScript;
