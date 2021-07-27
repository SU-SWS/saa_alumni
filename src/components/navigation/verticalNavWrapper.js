import React from "react";
import CreateBloks from "../../utilities/createBloks";

const VerticalNavWrapper = ({
  blok: { items, showNestedLevels },
  className,
}) => (
  <ul
    className={`${className} su-list-none su-p-0 children:su-border-t children:su-border-solid children:su-border-black-20 children:children:su-text-21`}
  >
    <CreateBloks blokSection={items} showNestedLevels={showNestedLevels} />
  </ul>
);

export default VerticalNavWrapper;
