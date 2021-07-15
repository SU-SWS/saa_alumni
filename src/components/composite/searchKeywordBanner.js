import React from "react";
import { StaticQuery, graphql } from "gatsby";
import CreateBloks from "../../utilities/createBloks";

// Get Search Keyword Banners.
const query = graphql`
  query {
    allStoryblokEntry(
      filter: { field_component: { eq: "searchKeywordBanner" } }
    ) {
      edges {
        node {
          content
          created_at
          field_keywords_string
        }
      }
    }
  }
`;
// Get most recently created Banner.
const getBanner = (entry, query) => {
  const created = {};
  entry.edges.map(
    ({ node: { content, created_at, field_keywords_string } }) => {
      const blok = JSON.parse(content);
      const split = field_keywords_string.split(",");
      const newSplit = split.map((str) => str.trim());
      if (newSplit.indexOf(query) >= 0) {
        created[Date.parse(created_at)] = blok;
      }
    }
  );

  return created ? created[Math.max(...Object.keys(created))].content : "";
};

const SearchKeywordBanner = ({ queryText }) => (
  <StaticQuery
    query={query}
    render={({ allStoryblokEntry }) => {
      if (!allStoryblokEntry?.edges.length) return null;
      const banner = getBanner(allStoryblokEntry, queryText);
      if (banner) {
        return <CreateBloks blokSection={banner} />;
      }

      return "";
    }}
  />
);

export default SearchKeywordBanner;
