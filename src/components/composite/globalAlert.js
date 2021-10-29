import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Alert from './alert';

const query = graphql`
  query {
    allStoryblokEntry(
      filter: { field_component: { eq: "alert" } }
      sort: { fields: published_at, order: DESC }
    ) {
      edges {
        node {
          content
          uuid
          id
          slug
          name
          field_component
          field_type_string
          field_heading_string
          field_label_string
        }
      }
    }
  }
`;

const GlobalAlert = () => (
  <StaticQuery
    query={query}
    render={({ allStoryblokEntry }) => {
      if (!allStoryblokEntry?.edges.length) return null;
      // Show Global Alerts only on Alumni Homesite and hide on Travel Study.
      const showAlerts =
        typeof window !== 'undefined' &&
        window.location.pathname.indexOf('/travel-study') !== 0 &&
        window.location.search.indexOf('path=travel-study') < 0 &&
        window.location.search.indexOf('path=/travel-study') < 0;

      return showAlerts ? (
        <>
          {allStoryblokEntry.edges.map(({ node: { content, uuid } }) => {
            const blok = JSON.parse(content);
            // eslint-disable-next-line dot-notation
            blok['_uid'] = uuid;
            return <Alert blok={blok} key={uuid} />;
          })}
        </>
      ) : null;
    }}
  />
);

export default GlobalAlert;
