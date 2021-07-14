import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Container, FlexCell, FlexBox } from "decanter-react";
import PerkCardHorizontal from "../cards/perkCardHorizontal";
import BasicCard from "../cards/basicCard";
import Wysiwyg from "../simple/wysiwyg";
import Poster from "../composite/poster";

const query = graphql`
  query {
    allStoryblokEntry(
      filter: {
        field_component: { eq: "searchKeywordBanner" }
      }
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

const SearchKeywordBanner = ({ queryText }) => (
  <StaticQuery
    query={query}
    render={({ allStoryblokEntry }) => {
      if (!allStoryblokEntry?.edges.length) return null;
      let created = {};
      allStoryblokEntry.edges.map(({ node: { content, created_at, field_keywords_string } }) => {
        const blok = JSON.parse(content);
        let split = field_keywords_string.split(',')
        let newSplit = split.map(str => str.trim());
        if (newSplit.indexOf(queryText) >= 0) {
          created[Date.parse(created_at)] = blok;
        }
      })
      let banner = '';
      if (created) {
        // Return most recently created Banner.
        let max = Math.max(...Object.keys(created));
        banner = created[max];
      }
      let content = '';
      if (banner) {
        switch (banner.content[0].component) {
          case 'perkCardHorizontal':
            content = (<PerkCardHorizontal blok={banner}/>);
            break;
          case 'basicCard':
            content = (<BasicCard blok={banner}/>);
            break;
          case 'wysiwyg':
            content = (<Wysiwyg blok={banner}/>);
            break;
          case 'poster':
            content = (<Poster blok={banner}/>);
            break;
        }
      }
      return content;
    }}
  />
);

export default SearchKeywordBanner;
