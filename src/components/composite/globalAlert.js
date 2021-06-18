import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Alert from "./alert";

const query = graphql`
  query {
    storyblokEntry(field_component: { eq: "alert" }) {
      id
      name
      created_at
      uuid
      slug
      full_slug
      content
      is_startpage
      parent_id
      group_id
    }
  }
`;

const GlobalAlert = () => (
  <StaticQuery
    query={query}
    render={({ storyblokEntry }) => (
      <Alert blok={JSON.parse(storyblokEntry.content)} />
    )}
  />
);

export default GlobalAlert;
