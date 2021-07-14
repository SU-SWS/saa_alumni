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
            let split = field_keywords_string.split(',')
            let newSplit = split.map(str => str.trim());
            return newSplit.indexOf(queryText) >= 0 ? name : '';
          })}
        </>
      );
    }}
  />
);

export default SearchKeywordBanner;
