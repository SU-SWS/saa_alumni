import React, { useState, useEffect } from 'react'
import Components from '../components/components.js'
import SbEditable from 'storyblok-react'
import Loader from 'react-loader-spinner'
import { useStaticQuery, graphql } from "gatsby"

/**
 *
 * @param {*} cb
 */
const loadStoryblokBridge = function(cb) {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `//app.storyblok.com/f/storyblok-latest.js`
  script.onload = cb
  document.getElementsByTagName('head')[0].appendChild(script)
}

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
      tmp = item.split('=')
      if (tmp[0] === val) {
        result = decodeURIComponent(tmp[1])
      }
    })

  return result
}

/**
 *
 */
const initStoryblokEvents = (sbResolveRelations, setState, myState) => {
  loadStory(sbResolveRelations, setState)

  let sb = window.storyblok

  sb.on(['change', 'published'], (payload) => {
    loadStory(sbResolveRelations, setState)
  })

  sb.on('input', (payload) => {
    if (myState.story && payload.story.id === myState.story.id) {
      payload.story.content = sb.addComments(payload.story.content, payload.story.id)
      sb.resolveRelations(payload.story, sbResolveRelations ||
        ['localFooterPicker.localFooter'],
        () => {
          setState({story: payload.story})
        })
    }
  })

  sb.pingEditor(() => {
    if (sb.inEditor) {
      sb.enterEditmode()
    }
  })
}

/**
 *
 */
const loadStory = (sbResolveRelations, setState) => {
  window.storyblok.get({
    slug: window.storyblok.getParam('path'),
    version: 'draft',
    resolve_relations: sbResolveRelations || []
  }, (data) => {
    setState({story: data.story})
  })
}

/**
 *
 */
const StoryblokEntry = (props) => {

  // State Management.
  const [myState, setState] = useState({story: null, bad: false});

  /**
   *
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
    // Storyblok Preview API access key.
    const key = getParam("access_key")

    // Must have a storyblok key.
    if (isNaN(getParam("_storyblok"))) {
      setState({bad: true})
      return
    }

    // Must have the API Access key.
    if (key === '') {
      setState({bad: true})
      return
    }

    loadStoryblokBridge(() => {

      // Init with access token from url.
      window.storyblok.init({
        accessToken: key
      })

      initStoryblokEvents(sbResolveRelations, setState, myState)
    })

  }, [setState, sbResolveRelations])

  /**
   *
   */
  if (myState.bad === true) {
    return (
      <div className="su-cc">
        <h1>Error</h1>
        <p>You can only access this page through https://app.storyblok.com.</p>
      </div>
    )
  }

  /**
   *
   */
  if (myState.story == null) {
    return (
      <div className="su-cc">
        <h1>Loading...</h1>
        <Loader type="Oval" color="#00BFFF" height={125} width={125} />
      </div>
    )
  }

  /**
   *
   */
  let content = myState.story.content;
  return (
    <SbEditable content={content}>
      <div>
        {React.createElement(Components(content.component), {key: content._uid, blok: content})}
      </div>
    </SbEditable>
  )
}

export default StoryblokEntry
