import React, { useState, useImperativeHandle } from 'react';
import SbEditable from 'storyblok-react';
import { Heading } from '../simple/Heading';
import RichTextField from '../../utilities/richTextField';

const AccordionItem = React.forwardRef(
  (
    {
      blok: {
        headingLevel,
        id,
        title,
        content: { content },
      },
      blok,
      accordionFont,
    },
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
        <li className="su-border-b su-border-digital-red">
          <Heading
            level={headingLevel || 'h4'}
            font="serif"
            {...(id ? { id } : {})}
          >
            <button
              type="button"
              className="su-w-full su-text-left su-font-bold su-flex su-flex-wrap"
              aria-expanded={expanded}
              onClick={toggle}
            >
              {title}
              <span className="su-ml-auto su-font-regular" aria-hidden>
                {expanded ? '-' : '+'}
              </span>
            </button>
          </Heading>

          {expanded && (
            <div className="su-rs-pb-1" aria-hidden={!expanded}>
              {content &&
                content.map((paragraph) => <RichTextField data={paragraph} />)}
            </div>
          )}
        </li>
      </SbEditable>
    );
  }
);

export default AccordionItem;
