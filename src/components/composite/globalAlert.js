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

      return (
        <>
          {allStoryblokEntry.edges.map(({ node: { content, uuid } }) => {
            const blok = JSON.parse(content);
            // eslint-disable-next-line dot-notation
            blok['_uid'] = uuid;
            return <Alert blok={blok} key={uuid} />;
          })}
        </>
      );
    }}
  />
);

export default GlobalAlert;
