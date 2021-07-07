import React from "react";
import CreateBloks from "../../utilities/createBloks";

const SearchNoResults = ({ heading, body, additionalContent }) => (
  <div>
    <h2>{heading}</h2>
    <div>{body}</div>

    <div>
      <CreateBloks blokSection={additionalContent} />
    </div>
  </div>
);

export default SearchNoResults;
