import { Heading } from "decanter-react";
import React from "react";
import CreateBloks from "../../utilities/createBloks";

const SearchNoResults = ({ heading, body, additionalContent }) => (
  <div>
    <Heading size={2} font="serif">
      {heading}
    </Heading>
    <p>{body}</p>
    <div>
      <CreateBloks blokSection={additionalContent} />
    </div>
  </div>
);

export default SearchNoResults;
