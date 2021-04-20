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
  var result = ''
  var tmp = []

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
const initBridge = function(key, sbResolveRelations, setStory, setError) {

  storyblokInstance = new window.StoryblokBridge({
    accessToken: key,
    resolveRelations: sbResolveRelations
  });

  console.log(storyblokInstance)

  storyblokInstance.on('input', (payload) => {
    // console.log(payload);
    setStory(payload.story.content)
  });

  storyblokInstance.on('change', (payload) => {
    // console.log(payload);
    setStory(payload.story.content)
  });

  storyblokInstance.on('enterEditmode', (info) => {
    console.log("Entering the edit mode");
    console.log(info);
    // setStory(payload.story);
  })

  storyblokInstance.on(['published', 'change'], (event) => {
    if (!event.slugChanged) {
      window.location.reload(true)
    }
  })

  // Call ping editor to see if in editor
  storyblokInstance.pingEditor(() => {
    if (storyblokInstance.isInEditor()) {
      // Load draft version of story
      // storyblokInstance.enterEditmode();
      // loadStory(setStory, sbResolveRelations)
      console.log("All done.")
    } else {
      // Load published version of story
      setError(true);
    }
  })
}

/**
 *
 */
 const loadStory = (setStory, sbResolveRelations) => {
  window.storyblok.get({
    slug: window.storyblok.getParam('path'),
    version: 'draft',
    resolve_relations: sbResolveRelations || []
  }, (data) => {
    setStory(data.story.content)
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
    `,
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
        initBridge(key, sbResolveRelations, setStory, setError);
        setState(true);
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
