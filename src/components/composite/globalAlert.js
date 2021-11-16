import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Alert from './alert';
import { isTravelStudy } from '../../contexts/GlobalContext';

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
      let showAlerts = false;
      showAlerts = !isTravelStudy;

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
