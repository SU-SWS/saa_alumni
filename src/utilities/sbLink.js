import React from "react";
import { useLocation } from "@reach/router";
import { parse } from "query-string";
import Link from "gatsby-link";
import { ArrowUpIcon } from "@heroicons/react/outline";
import { dcnb } from "cnbuilder";
import { assetURL, isNetlify } from "../contexts/GlobalContext";

/**
 * Reusable Storyblok Link component for various link types
 * eg: internal, external, asset
 * */

const SbLink = React.forwardRef((props, ref) => {
  // Storyblok link object either has a url (external links)
  // or cached_url (internal or asset links)
  let linkUrl = props.link?.url || props.link?.cached_url || "";

  // Default Classes for all links.
  const linkClasses = props.classes ?? "";
  const storyClasses = props.internalClasses ?? "";
  const urlClasses = props.externalClasses ?? "";
  const activeClass = props.activeClass ?? "";
  const assetClasses = props.assetClasses ?? "";
  const otherAttributes = props.attributes ?? {};

  // Get out of the url and keep track of specific utm parameters.
  const location = useLocation();
  const parsedSearch = parse(location.search);
  // utms variable will create a string of just the valid params we want to keep.
  let utms = "";
  const passParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];
  // Loop through the paramaters we want to continue to track and check to see
  // if the existing page url has them.
  passParams.forEach((i, v) => {
    if (parsedSearch[i] !== undefined) {
      utms += `${i}=${parsedSearch[i]}&`;
    }
  });
  // Strip off the last ampersand.
  utms = utms.replace(new RegExp("&$"), "");

  // Story or Internal type link.
  // ---------------------------------------------------------------------------
  if (props.link?.linktype === "story") {
    // Handle the home slug.
    linkUrl = linkUrl === "home" ? "/" : `/${linkUrl}`;
    linkUrl += linkUrl.endsWith("/") ? "" : "/";

    if (linkUrl.match(/\?/) && utms.length) {
      linkUrl += `&${utms}`;
    } else if (utms.length) {
      linkUrl += `?${utms}`;
    }

    return (
      <Link
        ref={ref}
        to={linkUrl}
        className={`${linkClasses} ${storyClasses}`}
        activeClassName={activeClass}
        {...otherAttributes}
      >
        {props.children}
      </Link>
    );
  }

  // External or absolute url type link.
  // ---------------------------------------------------------------------------
  let extLinkIcon = "";
  const extIconClasses = props.externalIconClasses ?? "";

  if (props.hasExternalIcon) {
    extLinkIcon = (
      <ArrowUpIcon
        className={dcnb(
          "su-relative su-inline-block su-transition su-transform-gpu su-rotate-45 group-hocus:su-rotate-45 su-ml-02em su-w-09em group-hocus:su-translate-x-02em group-hocus:su--translate-y-02em",
          extIconClasses
        )}
        aria-hidden="true"
      />
    );
  }

  if (props.link?.linktype === "url") {
    return (
      <a
        ref={ref}
        href={linkUrl}
        className={`${linkClasses} ${urlClasses}`}
        {...otherAttributes}
      >
        {props.children}
        <span className="su-sr-only"> (external link)</span>
        {extLinkIcon}
      </a>
    );
  }

  // A link to a file or other asset.
  // ---------------------------------------------------------------------------
  if (props.link?.linktype === "asset") {
    // Rewrite the URL to the redirect link to mask the API endpoint.
    if (isNetlify) {
      linkUrl = linkUrl.replace(
        /http?(s):\/\/a\.storyblok\.com/gi,
        `${assetURL}a`
      );
      linkUrl = linkUrl.replace(
        /http?(s):\/\/img?[0-9]\.storyblok\.com/gi,
        `${assetURL}i`
      );
    }

    return (
      <a
        ref={ref}
        href={linkUrl}
        className={`${linkClasses} ${assetClasses}`}
        target="_blank"
        rel="noreferrer"
        {...otherAttributes}
      >
        {props.children}
      </a>
    );
  }

  // Default if we don't know what type this is.
  // ---------------------------------------------------------------------------
  return (
    <a ref={ref} href={linkUrl} className={linkClasses} {...otherAttributes}>
      {props.children}
    </a>
  );
});

export default SbLink;
