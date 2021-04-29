import React, { useState, useEffect } from 'react'
import Components from '../components/components.js'
import SbEditable from 'storyblok-react'
import Loader from 'react-loader-spinner'
import { useStaticQuery, graphql } from "gatsby"
import StoryblokClient from 'storyblok-js-client/dist/es5/index.es'

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
const initBridge = function(key, sbResolveRelations, setStory) {

    // 1. Require the Storyblok client
  const storyblokInstance = new window.StoryblokBridge({
    resolveRelations: sbResolveRelations
  });

  // 2. Initialize the client with the preview token
  // from your space dashboard at https://app.storyblok.com
  let Storyblok = new StoryblokClient({
    accessToken: key
  })

  storyblokInstance.pingEditor(() => {
    if (storyblokInstance.isInEditor()) {
      loadStory(Storyblok, key, setStory);
    }
  })

  // Listens on multiple events and does a basic website refresh
  storyblokInstance.on(['change', 'published', 'unpublished'], () => {
    window.location.reload();
  })

  // When the content author does stuff.
  storyblokInstance.on('input', (payload) => {
    console.log(payload)
    setStory(payload.story.content);
  });
}

/**
 *
 */
 const loadStory = (Storyblok, key, setStory) => {

  Storyblok
    .get('cdn/stories/' + getParam('path') + "?token=" + key, {
      version: 'draft'
    })
    .then((data) => {
      let story = data.data.story;
      let ret = {action: "input", story: story};

      if (story) {
        console.log(ret)
        setStory(ret);
      }
    })
    .catch((error) => {
      console.log(error);
    })
}

/**
 * This is another try.
 */
const StoryblokEntry = (props) => {

  const [myStory, setStory] = useState(false);
  const [mounted, setMounted] = useState(false);

  /**
   * Get resolveRelations
   */
   const { site: { siteMetadata: { storyblok: { resolveRelations }}}} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            storyblok {
              resolveRelations
            }
          }
        }
      }
    `
  );

  const sbResolveRelations = resolveRelations;

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
      script.src = '//app.storyblok.com/f/storyblok-v2-latest.js';
      script.onload = () => {
        initBridge(key, sbResolveRelations, setStory);
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    setMounted(true);

    // Ready to go.
  }, [sbResolveRelations, mounted, setMounted, myStory]);

  /**
   * Show the content!
   */
  if (myStory && myStory.component) {
    return (
      <SbEditable content={myStory}>
        <div>
          {React.createElement(Components(myStory.component), {key: myStory._uid, blok: myStory})}
        </div>
      </SbEditable>
    )
  }

  // Loading...
  return (
    <div className="su-cc">
      <h1>Loading...</h1>
      <Loader type="Oval" color="#00BFFF" height={125} width={125} />
    </div>
  )

}

export default StoryblokEntry;
