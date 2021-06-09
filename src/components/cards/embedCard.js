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
import postscribe from "postscribe";
import { v4 as uuidv4 } from "uuid";

const EmbedCard = ({ blok: { embed: html }, blok }) => {
  const myEmbed = useRef(null);
  const uniqueId = uuidv4();

  useEffect(() => {
    if (!html) return;

    if (html.includes("script")) {
      postscribe(`#${uniqueId}`, html);
    } else {
      // Create a 'tiny' document and parse the html string.
      // https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
      const miniDom = document.createRange().createContextualFragment(html);

      // Clear the container.
      myEmbed.current.innerHTML = "";

      // Append the new content.
      myEmbed.current.appendChild(miniDom);
    }
  }, [html]);

  return (
    <SbEditable content={blok}>
      {html.includes("script") ? (
        <div id={uniqueId}></div>
      ) : (
        <div ref={myEmbed} />
      )}
    </SbEditable>
  );
};

export default EmbedCard;
