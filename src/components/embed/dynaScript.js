/* eslint-disable no-alert */
import React, { useRef, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

/**
 * Dynamically load a script after the component has been mounted.
 *
 * @param {*} props
 */
const DynaScript = ({ src, id, ...props }) => {
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
      alert(
        'Sorry, we are experiencing technical difficulties. Please try refreshing your browser or return later to make your gift. Thank you for giving to Stanford!'
      );
    };

    scriptRef.current.appendChild(script);

    return () => {
      mounted = false;
    };
  }, [src, setScriptLoaded, scriptRef]);

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
