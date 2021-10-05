import React from 'react';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';
import { Link } from 'gatsby';
import { dcnb } from 'cnbuilder';
import { config } from './config';
import HeroIcon from '../components/simple/heroIcon';

/**
 * Reusable Storyblok Link component for various link types
 * eg: internal, external, asset
 * */

const SbLink = React.forwardRef((props, ref) => {
  // Storyblok link object either has a url (external links)
  // or cached_url (internal or asset links)
  let linkUrl = props.link?.url || props.link?.cached_url || '';

  // Default Classes for all links.
  const linkClasses = props.classes ?? '';
  const storyClasses = props.internalClasses ?? '';
  const urlClasses = props.externalClasses ?? '';
  const activeClass = props.activeClass ?? '';
  const assetClasses = props.assetClasses ?? '';
  const otherAttributes = props.attributes ?? {};

  // Get out of the url and keep track of specific utm parameters.
  const location = useLocation();
  const parsedSearch = parse(location.search);
  // utms variable will create a string of just the valid params we want to keep.
  let utms = '';
  const passParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];
  // Loop through the paramaters we want to continue to track and check to see
  // if the existing page url has them.
  passParams.forEach((i, v) => {
    if (parsedSearch[i] !== undefined) {
      utms += `${i}=${parsedSearch[i]}&`;
    }
  });
  // Strip off the last ampersand.
  utms = utms.replace(new RegExp('&$'), '');

  // Story or Internal type link.
  // ---------------------------------------------------------------------------
  if (props.link?.linktype === 'story') {
    // Handle the home slug.
    linkUrl = linkUrl === 'home' ? '/' : `/${linkUrl}`;
    linkUrl += linkUrl.endsWith('/') ? '' : '/';

    if (linkUrl.match(/\?/) && utms.length) {
      linkUrl += `&${utms}`;
    } else if (utms.length) {
      linkUrl += `?${utms}`;
    }

    return (
      <Link
        ref={ref}
        to={linkUrl}
        className={dcnb(linkClasses, storyClasses)}
        activeClassName={activeClass}
        {...otherAttributes}
      >
        {props.children}
      </Link>
    );
  }

  // External or absolute url type link.
  // ---------------------------------------------------------------------------
  let extLinkIcon = '';
  const extIconClasses = props.externalIconClasses ?? '';

  if (props.hasExternalIcon) {
    extLinkIcon = (
      <HeroIcon
        iconType="external"
        isAnimate
        className={dcnb('su-relative su-inline-block', extIconClasses)}
      />
    );
  }

  if (props.link?.linktype === 'url') {
    return (
      <a
        ref={ref}
        href={linkUrl}
        className={dcnb(linkClasses, urlClasses)}
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
  if (props.link?.linktype === 'asset') {
    // Rewrite the URL to the redirect link to mask the API endpoint.
    linkUrl = linkUrl.replace(
      /http?(s):\/\/a\.storyblok\.com/gi,
      `${config.assetCdn}a`
    );
    linkUrl = linkUrl.replace(
      /http?(s):\/\/img?[0-9]\.storyblok\.com/gi,
      `${config.assetCdn}i`
    );

    return (
      <a
        ref={ref}
        href={linkUrl}
        className={dcnb(linkClasses, assetClasses)}
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
