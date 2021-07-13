import React from "react";
import { Heading } from "decanter-react";
import CreateBloks from "../../utilities/createBloks";

const SearchSuggestions = ({ title, content }) => (
  <div>
    <Heading font="serif" size={1} level={4} className="su-text-white">
      {title}
    </Heading>
    <CreateBloks blokSection={content} />
  </div>
);

export default SearchSuggestions;
