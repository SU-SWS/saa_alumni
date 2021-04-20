import React, { useState, useEffect } from 'react'
import Components from '../components/components.js'
import SbEditable from 'storyblok-react'
import Loader from 'react-loader-spinner'
import { useStaticQuery, graphql } from "gatsby"

let storyblokInstance;

/**
 *
 * @param {*} val
 * @returns
 */
const getParam = function(val) {
  var result = '';
  var tmp = [];

  window.location.search
    .substr(1)
    .split('&')
    .forEach(function (item) {
      tmp = item.split('=');
      if (tmp[0] === val) {
        result = decodeURIComponent(tmp[1]);
      }
    })

  return result;
}

/**
 * This is Sparta
 */
const initBridge = function(key, sbResolveRelations, setStory, setError, setState) {

  storyblokInstance = new window.StoryblokBridge({
    accessToken: key,
    resolveRelations: sbResolveRelations
  });

  storyblokInstance.on('input', (payload) => {
    console.log(payload);
    if (payload !== undefined) {
      setStory(payload.story.content)
    }
  });

  storyblokInstance.on('change', (payload) => {
    console.log(payload);
    if (payload) {
      setStory(payload.story.content)
    }
  });

  storyblokInstance.on('enterEditmode', (info) => {
    console.log("Entering the edit mode -------------");
    console.log(info);
    console.log("------------------ -------------");
  })

  storyblokInstance.on(['published', 'change'], (event) => {
    if (!event.slugChanged) {
      console.log('on slug change.');
      window.location.reload()
    }
  })

  storyblokInstance.on('viewLiveVersion', (event) => {
    console.log("Load live version.");
    console.log(event);
  })

  // Call ping editor to see if in editor
  storyblokInstance.pingEditor((editor) => {
    if (storyblokInstance.isInEditor()) {
      setState(true);
      console.log(editor);
    }
    else {
      // Load published version of story
      setError(true);
    }
  })

}

/**
 * This is another try.
 */
const StoryblokEntry = (props) => {

  const [myState, setState] = useState(false);
  const [hasError, setError] = useState(false);
  const [myStory, setStory] = useState({});
  const [mounted, setMounted] = useState(false);
  let content = {};

  /**
   * Get resolveRelations
   */
   const { sbResolveRelations } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            storyblok {
              sbResolveRelations: resolveRelations
            }
          }
        }
      }
    `
  );

  /**
   *
   */
  useEffect(() => {

    // One time load only.
    if (!mounted) {
        // Storyblok Preview API access key.
      const key = getParam("access_key");

      // Must have the API Access key.
      if (key.length === 0 || typeof key !== "string") {
        return;
      }

      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js';
      script.onload = () => {
        initBridge(key, sbResolveRelations, setStory, setError, setState);
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    setMounted(true);

    // Ready to go.
  }, [setState, sbResolveRelations, mounted, setMounted, myStory, setError]);

  // If the state is good but the story hasn't been oaded yet. Show loading.
  if (!myState) {
    return (
      <div className="su-cc">
        <h1>Loading...</h1>
        <Loader type="Oval" color="#00BFFF" height={125} width={125} />
      </div>
    )
  }

  if (hasError) {
    return (<h1>Error</h1>)
  }

  /**
   * Show the content!
   */
  content = myStory;
  return (
    <SbEditable content={content}>
      {React.createElement(Components(content.component), {key: content._uid, blok: content})}
    </SbEditable>
  )
}

export default StoryblokEntry;
