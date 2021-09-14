import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import CreateBloks from '../../utilities/createBloks';

// Get most recently created Banner.
const getBanner = (data, q) => {
  const created = {};
  data.edges.map(({ node }) => {
    const blok = JSON.parse(node.content);
    const split = node.field_keywords_string.split(',');
    const newSplit = split.map((str) => str.trim());
    if (newSplit.indexOf(q) >= 0) {
      created[Date.parse(node.created_at)] = blok;
    }

    return created;
  });

  const max = created ? Math.max(...Object.keys(created)) : false;

  return max && created[max] ? created[max].content : '';
};

const SearchKeywordBanner = function ({ queryText }) {
  // Get Search Keyword Banners.
  const data = useStaticQuery(graphql`
    query searchKeywordBanners {
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
  `);
  if (!data.allStoryblokEntry?.edges.length) {
    return null;
  }

  const banner = getBanner(data.allStoryblokEntry, queryText);
  if (banner) {
    return (
      <div className="su-rs-mb-5">
        <CreateBloks blokSection={banner} />
      </div>
    );
  }

  return null;
};

export default SearchKeywordBanner;
