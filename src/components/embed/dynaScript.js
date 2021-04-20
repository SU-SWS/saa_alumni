import React, { useRef, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

/**
 * Dynamically load a script after the component has been mounted.
 *
 * @param {*} props
 */
const DynaScript = ({src, id, ...props}) => {
  const scriptRef = useRef()
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // When the component mounts load the script.
  useEffect(
    () => {
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
        alert('Something went wrong. Please reload the page to try again.');
      }
      scriptRef.current.appendChild(script);

      return () => {
        mounted = false;
      }
    },
    [src, setScriptLoaded, scriptRef]
  );

  return (
    <>
      <div ref={scriptRef} aria-live="polite" aria-busy={!scriptLoaded} id={id} />
      {!scriptLoaded && (
        <>
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={30000} aria-busy="true" />
        Loading...
        </>
      )}
    </>
  )
}

export default DynaScript;
