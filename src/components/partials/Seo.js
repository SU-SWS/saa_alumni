import React from "react";
import { Helmet } from "react-helmet";
import SbEditable from "storyblok-react";
import UseSiteMetadata from "../../hooks/useSiteMetadata";
import transformImage from "../../utilities/transformImage";

/**
 * If no Twitter specific metadata is provided,
 * Twitter can still read the generic OG metadata.
 * The Storyblok SEO OG image and Twitter image make use of the old image block,
 * and thus returns a string, not an object like the new asset block.
 */

const Seo = (props) => {
  const { title, description } = UseSiteMetadata();

  // If no SEO fields are filled in, use site default description from gatsby.config and page title
  if (props.blok.seo == null) {
    return (
      <Helmet titleTemplate={`%s | ${title}`} title={props.blok.title}>
        <meta name='description' content={description} />
      </Helmet>
    )
  }

  // Use the title in SEO component, otherwise use the page title
  let seoTitle = props.blok.seo.title || props.blok.title || '';
  let ogTitle = props.blok.seo.og_title || seoTitle;

  // Use the description in SEO component, otherwise use the one from gatsby.config
  let seoDescription = props.blok.seo.description || description || '';
  let ogDescription = props.blok.seo.og_description || seoDescription;

  let ogImage = props.blok.seo.og_image ?? '';
  let twitterImage = props.blok.seo.twitter_image ?? '';

  if (ogImage !== '') {
    ogImage = transformImage(ogImage, '/1200x630');
  }

  if (twitterImage !== '') {
    twitterImage = transformImage(twitterImage, '/1200x600');
  }

  return (
    <SbEditable content={props.blok}>
      <Helmet titleTemplate={`%s | ${title}`} title={seoTitle}>
        {seoDescription !== '' &&
          <meta name='description'
                content={seoDescription} />
        }
        {ogTitle !== '' &&
          <meta property='og:title'
                content={ogTitle} />
        }
        {ogDescription !== '' &&
          <meta property='og:description'
                content={ogDescription} />
        }
        {ogImage !== '' &&
          <meta property='og:image'
              content={ogImage} />
        }
        {props.blok.seo.twitter_title &&
          <meta name='twitter:title'
                content={props.blok.seo.twitter_title} />
        }
        {props.blok.seo.twitter_description &&
          <meta name='twitter:description'
                content={props.blok.seo.twitter_description} />
        }
        {twitterImage !== '' &&
          <meta name='twitter:image'
                content={twitterImage} />
        }
      </Helmet>
    </SbEditable>
  )
}

export default Seo;
