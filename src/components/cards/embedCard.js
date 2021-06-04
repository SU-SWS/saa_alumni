/**
 * Credit where credit is deserved.
 * @see: https://github.com/christo-pr/dangerously-set-html-content
 *
 * Use this widget with caution. There are no safeguards on what it can do. It
 * is also not good practice to inject and manipulate the page outside of
 * REACT as that can lead to irregularities and troubles.
 */
import React, { useEffect, useRef } from "react";
import SbEditable from "storyblok-react";

const EmbedCard = ({ blok: { embed: html }, blok }) => {
  const myEmbed = useRef(null);

  useEffect(() => {
    if (!html) return;

    // Create a 'tiny' document and parse the html string.
    // https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    const miniDom = document.createRange().createContextualFragment(html);

    // Force the scripts in the embed script field to load sync.
    const scripts = miniDom.querySelectorAll("script");
    if (scripts.length >= 1) {
      for (let item of scripts) {
        if (item.src && item.src.length > 1) {
          item.async = 0;
          item.defer = 0;
        }
      }
    }

    // Clear the container.
    myEmbed.current.innerHTML = "";

    // Append the new content.
    myEmbed.current.appendChild(miniDom);
  }, [html]);

  return (
    <SbEditable content={blok}>
      <div ref={myEmbed} />
    </SbEditable>
  );
};

export default EmbedCard;
