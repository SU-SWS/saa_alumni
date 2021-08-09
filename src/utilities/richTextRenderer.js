import React from "react";
import {
  render,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_LINK,
  NODE_HEADING,
  NODE_IMAGE,
} from "storyblok-rich-text-react-renderer";
import { Heading } from "decanter-react";
import { dcnb } from "cnbuilder";
import { Link } from "gatsby";
import CardImage from "../components/media/cardImage";
import { config } from "./config";

const RichTextRenderer = ({ wysiwyg, isDark, className }) => {
  let textColor = "su-text-current";
  let linkColor = "";

  if (isDark) {
    textColor = "su-text-black-20";
    linkColor = "su-text-digital-red-xlight hocus:su-text-white";
  }
  const rendered = render(wysiwyg, {
    markResolvers: {
      [MARK_BOLD]: (children) => <strong>{children}</strong>,
      [MARK_ITALIC]: (children) => <em>{children}</em>,
      [MARK_LINK]: (children, props) => {
        const { href, target, linktype } = props;
        if (linktype === "email") {
          // Email links: add `mailto:` scheme and map to <a>
          return (
            <a href={`mailto:${href}`} className={linkColor}>
              {children}
            </a>
          );
        }
        if (linktype === "story") {
          // Internal links: map to gatsby <Link>
          return (
            <Link to={href} className={linkColor}>
              {children}
            </Link>
          );
        }

        if (linktype === "asset") {
          // Asset links: map to <a>
          // Rewrite the URL to the redirect link to mask the API endpoint.
          let linkUrl = href;
          if (config.isNetlify) {
            linkUrl = linkUrl.replace(
              /http?(s):\/\/a\.storyblok\.com/gi,
              `${config.assetCdn}a`
            );
            linkUrl = linkUrl.replace(
              /http?(s):\/\/img?[0-9]\.storyblok\.com/gi,
              `${config.assetCdn}i`
            );
          }
          return (
            <a href={linkUrl} target={target} className={linkColor}>
              {children}
            </a>
          );
        }
        // External links: map to <a> with external-link classname (used for styling)
        return (
          <a
            href={href}
            target={target}
            className={dcnb("su-external-link", linkColor)}
          >
            {children}
          </a>
        );
      },
    },
    nodeResolvers: {
      [NODE_HEADING]: (children, props) => {
        const { level } = props;
        if (level === 2) {
          return (
            <Heading level={2} font="serif" size={4}>
              {children}
            </Heading>
          );
        }

        if (level === 3) {
          return (
            <Heading level={3} font="serif" size={3}>
              {children}
            </Heading>
          );
        }

        if (level === 4) {
          return (
            <Heading level={4} font="serif" size={2}>
              {children}
            </Heading>
          );
        }

        if (level === 5) {
          return (
            <Heading level={5} font="serif" size={1}>
              {children}
            </Heading>
          );
        }

        if (level === 6) {
          return (
            <Heading level={6} font="serif" size={0}>
              {children}
            </Heading>
          );
        }

        return null;
      },
      [NODE_IMAGE]: (children, { src, alt }) => (
        <CardImage size="horizontal" filename={src} alt={alt} loading="lazy" />
      ),
    },
    defaultStringResolver: (str) => <p>{str}</p>,
  });

  return (
    <div className={dcnb("su-wysiwyg", textColor, className)}>{rendered}</div>
  );
};

export default RichTextRenderer;
