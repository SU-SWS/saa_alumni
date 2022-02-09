import React, { useRef } from 'react';
import SbEditable from 'storyblok-react';
import { Heading } from '../simple/Heading';
import Components from '../components';
import {
  smallPaddingBottom,
  smallPaddingTop,
} from '../../utilities/dataSource';

const Accordion = ({
  blok: { spacingTop, spacingBottom, id, title, _uid },
  blok,
}) => {
  const refs = useRef();
  refs.current = [];

  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  // Expand all children accordion items.
  const expandAll = () => {
    refs.current.map((item) => item.expand());
  };

  // Collapse all children accordion items.
  const collapseAll = () => {
    refs.current.map((item) => item.collapse());
  };

  const spacingTopStyle = smallPaddingTop[spacingTop];
  const spacingBottomStyle = smallPaddingBottom[spacingBottom];

  return (
    <SbEditable content={blok}>
      <div
        className={`su-cc
            ${spacingTop !== 'none' ? spacingTopStyle : ''}
            ${spacingBottom !== 'none' ? spacingBottomStyle : ''}`}
        {...(id ? { id } : {})}
      >
        {title && (
          <Heading level={blok.headingLevel} font="serif" weight="bold">
            {blok.title}
          </Heading>
        )}
        {blok.accordionItems.length > 1 && (
          <div className="su-flex su-justify-end">
            <button
              type="button"
              className="su-button su-rs-mb-3 su-rs-ml-1"
              onClick={collapseAll}
            >
              Collapse all
            </button>

            <button
              type="button"
              className="su-button su-rs-mb-3 su-rs-ml-1"
              onClick={expandAll}
            >
              Expand all
            </button>
          </div>
        )}
        <ul className="su-list-none su-p-0">
          {blok.accordionItems.map((item, index) =>
            React.createElement(Components('accordionItem'), {
              // eslint-disable-next-line no-underscore-dangle
              key: item._uid,
              blok: item,
              ref: addToRefs,
            })
          )}
        </ul>
      </div>
    </SbEditable>
  );
};

export default Accordion;
