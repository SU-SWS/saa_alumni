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
  const buttonsStyle =
    'su-inline-block su-w-fit su-group su-border-solid su-border-3 su-transition-colors su-no-underline su-underline-offset su-font-regular hocus:su-underline su-border-digital-red su-text-digital-red-light hocus:su-bg-cardinal-red-xdark hocus:su-text-white hocus:su-shadow-md su-px-20 su-pt-10 su-pb-10 md:su-px-26 su-text-18 md:su-text-20 su-rs-mb-3 su-rs-ml-1';

  return (
    <SbEditable content={blok}>
      <div
        className={`su-cc
            ${spacingTop !== 'none' ? spacingTopStyle : ''}
            ${spacingBottom !== 'none' ? spacingBottomStyle : ''}`}
        {...(id ? { id } : {})}
      >
        {title && (
          <Heading
            level={blok.headingLevel}
            className="su-type-3"
            font="serif"
            weight="bold"
          >
            {blok.title}
          </Heading>
        )}
        {blok.accordionItems.length > 1 && (
          <div className="su-flex su-justify-end">
            <button
              type="button"
              className={buttonsStyle}
              onClick={collapseAll}
            >
              Collapse all
            </button>
            <button type="button" className={buttonsStyle} onClick={expandAll}>
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
