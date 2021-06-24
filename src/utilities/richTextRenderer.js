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
import Link from "gatsby-link";
import CardImage from "../components/media/cardImage";

const RichTextRenderer = ({ wysiwyg, className }) => {
  const rendered = render(wysiwyg, {
    markResolvers: {
      [MARK_BOLD]: (children) => <strong>{children}</strong>,
      [MARK_ITALIC]: (children) => <em>{children}</em>,
      [MARK_LINK]: (children, props) => {
        const { href, target, linktype } = props;
        if (linktype === "email") {
          // Email links: add `mailto:` scheme and map to <a>
          return <a href={`mailto:${href}`}>{children}</a>;
        }
        if (linktype === "url") {
          // External links: map to <a>
          return (
            <a href={href} target={target}>
              {children}
            </a>
          );
        }
        // Internal links: map to gatsby <Link>
        return <Link to={href}>{children}</Link>;
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
      [NODE_IMAGE]: (children, props) => (
        <CardImage size="horizontal" {...props} />
      ),
    },
    defaultStringResolver: (str) => <p>{str}</p>,
  });

  return <div className={dcnb("su-wysiwyg", className)}>{rendered}</div>;
};

export default RichTextRenderer;
