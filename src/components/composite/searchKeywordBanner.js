import React from "react";
import { StaticQuery, graphql } from "gatsby";

const query = graphql`
  query {
    allStoryblokEntry(
      filter: {
        field_component: { eq: "searchKeywordBanner" }
      }
    ) {
      edges {
        node {
          name
          content
          field_keywords_string
        }
      }
    }
  }
`;

const SearchKeywordBanner = ({ queryText }) => (
  <StaticQuery
    query={query}
    render={({ allStoryblokEntry }) => {
      if (!allStoryblokEntry?.edges.length) return null;
      return (
        <>
          {allStoryblokEntry.edges.map(({ node: { name, content, field_keywords_string } }) => {
            console.log(queryText)
            return name;
          })}
        </>
      );
    }}
  />
);

export default SearchKeywordBanner;
