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
    const url = window.location.href;

    // Loop through menu items and add active and activeTrail props
    // TODO: Update this to support unlimited levels
    for (let i = 0; i < items.length; i += 1) {
      const data = items;
      if (url.indexOf(data[i].link.cached_url) > -1) {
        data[i].active = true;
        break;
      } else {
        for (let k = 0; k < data[i].childItems.length; k += 1) {
          if (url.indexOf(data[i].childItems[k].link.cached_url) > -1) {
            data[i].childItems[k].active = true;
            data[i].activeTrail = true;
            break;
          }
        }
      }
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
