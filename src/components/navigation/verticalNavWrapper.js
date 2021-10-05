import React from 'react';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../utilities/createBloks';

const VerticalNavWrapper = ({
  blok: { items, showNestedLevels },
  className,
  pageLink,
  ...props
}) => {
  // Check if current link is active
  if (pageLink) {
    // Check if menu item's url matches the current page url
    const urlMatch = (link) =>
      pageLink.indexOf(link) > -1 &&
      (!pageLink.split(link)[1] || pageLink.split(link)[1] === '/');

    // Recursive function that will add active and activeTrail props to the active link, it's parents and the
    // immediate children if available.
    const setLinkProps = (obj) => {
      if (obj) {
        if (urlMatch(obj.link.cached_url)) {
          // eslint-disable-next-line no-param-reassign
          obj.active = true;
        } else if (obj.childItems.length > 0) {
          // eslint-disable-next-line no-param-reassign, array-callback-return
          obj.childItems.map((child) => {
            // eslint-disable-next-line no-param-reassign
            obj.activeTrail = true;
            if (urlMatch(child.link.cached_url)) {
              // eslint-disable-next-line no-param-reassign
              child.active = true;
            } else {
              setLinkProps(child);
            }
          });
        }
      }
    };

    if (items.length > 0) {
      // eslint-disable-next-line array-callback-return
      items.map((item, key) => {
        // Recursive function that will check which of the first level items have the active item and need to be opened.
        const getActiveSubmenu = function (obj) {
          if (urlMatch(obj.link.cached_url)) {
            setLinkProps(items[key]);
          } else if (obj.childItems.length > 0) {
            // eslint-disable-next-line array-callback-return
            obj.childItems.map((child) => {
              if (urlMatch(child.link.cached_url)) {
                setLinkProps(items[key]);
              } else {
                getActiveSubmenu(child);
              }
            });
          }
        };
        if (!showNestedLevels) {
          getActiveSubmenu(item);
        } else {
          setLinkProps(item);
        }
      });
    }
  }
  return (
    <ul
      className={dcnb(
        'su-list-none su-p-0 su-border su-border-solid su-border-black-10 lg:su-border-none children:su-border-t children:su-border-solid children:su-border-black-20 children:children:su-text-21 children:first:su-border-t-0 lg:children:first:su-border-t',
        className
      )}
      {...props}
    >
      <CreateBloks blokSection={items} showNestedLevels={showNestedLevels} />
    </ul>
  );
};

export default VerticalNavWrapper;
