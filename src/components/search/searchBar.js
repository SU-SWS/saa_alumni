import React from "react";
import { SrOnlyText } from "decanter-react";

const SearchBar = ({
  placeholderText = "Search",
  srLabel = "Search Stanford Alumni",
  srButtonText = "Submit Search",
  ...props
}) => (
  <form className="su-inline-block" {...props}>
    <label className="su-sr-only" htmlFor="search-field">
      {srLabel}
    </label>
    <input
      type="text"
      name="search-field"
      className="su-inline-block su-text-18 su-px-1em su-py-6 su-rounded-full"
      placeholder={placeholderText}
    />
    <button value="Search" type="submit" name="submit" className="su-sr-only">
      <SrOnlyText srText={srButtonText} />
    </button>
  </form>
);

export default SearchBar;
