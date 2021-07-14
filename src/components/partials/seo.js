import React from "react";
import { Helmet } from "react-helmet";
import SbEditable from "storyblok-react";
import UseSiteMetadata from "../../hooks/useSiteMetadata";
import transformImage from "../../utilities/transformImage";

/**
 * Get the canonical URL for the current page.
 *
 * @param {Object} blok Content object from Storyblok.
 * @param {string} siteUrl Full base URL for the site. i.e. https://alumni.stanford.edu
 * @param {Object} location Gatsby location object.
 * @returns {string} URL to be used for canonical URL metatag.
 */
function getCanonicalUrl(blok, siteUrl, location = {}) {
  // Default: Use the current path as the canonical URL
  let canonicalUrl = siteUrl + location?.pathname;

  if (!blok.canonicalURL) return canonicalUrl;

  // If an absolute URL was specified...
  if (blok.canonicalURL.linktype === "url") {
    canonicalUrl = blok.canonicalURL.url;
  }
  // If the user referenced another page within Storyblok...
  else if (
    blok.canonicalURL.linktype === "story" &&
    blok.canonicalURL.cached_url
  ) {
    canonicalUrl = `${siteUrl}/${blok.canonicalURL.cached_url}`;
  }

  return canonicalUrl;
}

/**
 * If no Twitter specific metadata is provided,
 * Twitter can still read the generic OG metadata.
 * The Storyblok SEO OG image and Twitter image make use of the old image block,
 * and thus returns a string, not an object like the new asset block.
 */

const Seo = ({ location, blok: { title: theTitle, seo }, blok }) => {
  const { title, description, siteUrl } = UseSiteMetadata();

  // If no SEO fields are filled in, use site default description from gatsby.config and page title
  if (seo == null) {
    return (
      <Helmet titleTemplate={`%s | ${title}`} title={theTitle}>
        <meta name="description" content={description} />
      </Helmet>
    );
  }

  // Use the title in SEO component, otherwise use the page title
  const seoTitle = seo.title || theTitle || "";
  const ogTitle = seo.og_title || seoTitle;

  // Use the description in SEO component, otherwise use the one from gatsby.config
  const seoDescription = seo.description || description || "";
  const ogDescription = seo.og_description || seoDescription;

  let ogImage = seo.og_image ?? "";
  let twitterImage = seo.twitter_image ?? "";

  if (ogImage !== "") {
    ogImage = transformImage(ogImage, "/1200x630");
  }

  if (twitterImage !== "") {
    twitterImage = transformImage(twitterImage, "/1200x600");
  }

  const canonicalUrl = getCanonicalUrl(blok, siteUrl, location);

  return (
    <SbEditable content={blok}>
      <Helmet titleTemplate={`%s | ${title}`} title={seoTitle}>
        <link rel="canonical" href={canonicalUrl} />

        {seoDescription !== "" && (
          <meta name="description" content={seoDescription} />
        )}
        {ogTitle !== "" && <meta property="og:title" content={ogTitle} />}
        {ogDescription !== "" && (
          <meta property="og:description" content={ogDescription} />
        )}
        {ogImage !== "" && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content="summary" />
        {seo.twitter_title && (
          <meta name="twitter:title" content={seo.twitter_title} />
        )}
        {seo.twitter_description && (
          <meta name="twitter:description" content={seo.twitter_description} />
        )}
        {twitterImage !== "" && (
          <meta name="twitter:image" content={twitterImage} />
        )}
      </Helmet>
    </SbEditable>
  );
};

export default Seo;
