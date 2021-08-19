import React from "react";
import { dcnb } from "cnbuilder";
import CreateBloks from "../../utilities/createBloks";

const VerticalNavWrapper = ({
  blok: { items, showNestedLevels },
  className,
  ...props
}) => {
  const isBrowser = typeof window !== "undefined";

  // Check if is browser and if current link is active
  if (isBrowser) {
    // Check if menu item's url matches the current page url
    const urlMatch = (link) => {
      const url = window.location.href;
      return url.indexOf(link) > -1 && (!url.split(link)[1] || url.split(link)[1] === "/")
    }

    // Recursive function that will add active and activeTrail props to the active link, it's parents and the
    // immediate children if available.
    const setLinkProps = (obj) => {
      if (obj) {
        if (urlMatch(obj.link.cached_url)) {
          obj.active = true;
        } else {
          if (obj.childItems.length > 0) {
            obj.childItems.map((child) => {
              obj.activeTrail = true;
              if (urlMatch(child.link.cached_url)) {
                child.active = true;
              }
              else {
                setLinkProps(child);
              }
            })
          }
        }
      }
    };

    if (items.length > 0) {
      items.map((item, key) => {
        // Recursive function that will check which of the first level items have the active item and need to be opened.
        const getActiveSubmenu = function (obj) {
          if (urlMatch(obj.link.cached_url)) {
            setLinkProps(items[key]);
          } else if (obj.childItems.length > 0) {
            obj.childItems.map((child) => {
              if (urlMatch(child.link.cached_url)) {
                setLinkProps(items[key]);
              }
              else {
                getActiveSubmenu(child);
              }
            })
          }
        }

        getActiveSubmenu(item);
      })
    }
  }
  return (
    <ul
      className={dcnb(
        "su-list-none su-p-0 children:su-border-t children:su-border-solid children:su-border-black-20 children:children:su-text-21",
        className
      )}
      {...props}
    >
      <CreateBloks blokSection={items} showNestedLevels={showNestedLevels} />
    </ul>
  );
};

export default VerticalNavWrapper;
