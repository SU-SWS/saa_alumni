/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-danger */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/**
 * Credit where credit is deserved.
 * @see: https://github.com/christo-pr/dangerously-set-html-content
 *
 * Use this widget with caution. There are no safeguards on what it can do. It
 * is also not good practice to inject and manipulate the page outside of
 * REACT as that can lead to irregularities and troubles.
 */
import React, { useEffect, useRef, useState } from 'react';
import SbEditable from 'storyblok-react';
import postscribe from 'postscribe';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const EmbedCard = ({ blok: { embed: html }, blok }) => {
  const myEmbed = useRef(null);
  const uniqueId = `su-alumni-${blok._uid}`;
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!html) return;

    if (html.includes('script')) {
      postscribe(`#${uniqueId}`, html, {
        done: () => {
          setScriptLoaded(true);
        },
      });
    } else {
      // Create a 'tiny' document and parse the html string.
      // https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
      const miniDom = document.createRange().createContextualFragment(html);
      // Clear the container.
      myEmbed.current.innerHTML = '';
      // Append the new content.
      myEmbed.current.appendChild(miniDom);
    }
  }, []);

  if (!html) {
    return null;
  }

  return (
    <SbEditable content={blok}>
      {html.includes('script') ? (
        <>
          <div id={uniqueId} aria-live="polite" aria-busy={!scriptLoaded} />
          {!scriptLoaded && (
            <>
              <Loader
                type="TailSpin"
                color="#00BFFF"
                height={50}
                width={50}
                timeout={30000}
              />
              <p>Loading...</p>
            </>
          )}
        </>
      ) : (
        <div ref={myEmbed} />
      )}
    </SbEditable>
  );
};

export default EmbedCard;
