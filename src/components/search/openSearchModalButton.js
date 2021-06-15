import React from "react";
import { Button } from "decanter-react";
import { SearchIcon } from "@heroicons/react/solid";

const OpenSearchModalButton = (props) => (
  <Button
    type="button"
    className={{
      "su-leading-display": false,
      "hocus:su-bg-transparent": false,
      "search-button su-pl-16 su-pr-13 su-rounded-full su-text-18 su-leading-none su-border-2 su-border-solid su-border-digital-red-xlight su-transition-colors lg:hocus:su-bg-cardinal-red-xxdark xl:hocus:su-bg-cardinal-red-xdark": true,
    }}
    variant="unset"
    size="minimal"
    aria-label="Search Stanford Alumni sites"
    {...props}
  >
    <span className="su-sr-only lg:su-not-sr-only su-leading-none">Search</span>
    <SearchIcon
      aria-hidden="true"
      className="su-inline-block su-w-20 lg:su-ml-6"
    />
  </Button>
);

export default OpenSearchModalButton;
