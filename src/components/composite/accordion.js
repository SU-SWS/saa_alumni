import React, { useRef } from 'react';
import SbEditable from 'storyblok-react';
import { Heading } from '../simple/Heading';
import Components from '../components';
import { SAAButton } from '../simple/SAAButton';
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
  const buttonsStyle = 'su-pt-12 su-pb-12 md:su-pt-10 md:su-pb-10 su-rs-ml-1';

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
          <div className="su-flex su-justify-end su-rs-mb-2">
            <SAAButton
              buttonStyle="secondary"
              size="small"
              className={buttonsStyle}
              icon="none"
              onClick={collapseAll}
            >
              Collapse all
            </SAAButton>
            <SAAButton
              buttonStyle="secondary"
              size="small"
              className={buttonsStyle}
              icon="none"
              onClick={expandAll}
            >
              Expand all
            </SAAButton>
          </div>
        )}
        <ul className="su-list-none su-p-0 su-border-t su-border-digital-red">
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
