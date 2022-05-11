import React, { useState, useImperativeHandle } from 'react';
import SbEditable from 'storyblok-react';
import { Heading } from '../simple/Heading';
import RichTextRenderer from '../../utilities/richTextRenderer';
import hasRichText from '../../utilities/hasRichText';

const AccordionItem = React.forwardRef(
  (
    { blok: { headingLevel, id, title, content }, blok, accordionFont },
    ref
  ) => {
    const [expanded, setExpanded] = useState(false);
    // Expand/Collapse toggle.
    const toggle = () => {
      setExpanded(!expanded);
    };

    useImperativeHandle(ref, () => ({
      expand() {
        setExpanded(true);
      },
      collapse() {
        setExpanded(false);
      },
    }));

    return (
      <SbEditable content={blok}>
        <li className="su-border-b su-border-digital-red su-mb-0">
          <Heading
            level={headingLevel || 'h4'}
            font="serif"
            className="su-type-1 su-m-0"
            {...(id ? { id } : {})}
          >
            <button
              type="button"
              className="su-w-full su-px-15 su-py-7 su-text-left su-font-bold su-flex su-justify-between su-items-center
              su-group su-relative"
              aria-expanded={expanded}
              onClick={toggle}
            >
              <span className="su-h-0 group-hover:su-h-full group-focus:su-h-full su-block su-w-[6px] su-absolute su-top-0 su-left-0 su-bg-black" />
              <span className="su-pr-20 su-w-full group-hover:su-underline group-focus:su-underline">
                {title}
              </span>
              <span className="su-font-light su-text-[36px] su-text-digital-red su-block">
                {expanded ? <span>&#8722;</span> : '+'}
              </span>
            </button>
          </Heading>

          {expanded && (
            <div className="su-px-19 su-pt-19 su-pb-36" aria-hidden={!expanded}>
              {hasRichText(content) && (
                <RichTextRenderer
                  wysiwyg={content}
                  className="su-card-paragraph children:su-leading-snug children:!su-mb-06em last:children:!su-mb-0"
                />
              )}
            </div>
          )}
        </li>
      </SbEditable>
    );
  }
);

export default AccordionItem;
