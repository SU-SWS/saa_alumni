import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { SBAlert } from '../../storyblok/alert/alert';
import { Alert } from './Alert';
import useSubsite from '../../../hooks/useSubsite';
import AuthContext from '../../../contexts/AuthContext';

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

const GlobalAlert = () => {
  const hideAlerts = useSubsite() !== 'homesite';
  const [showAlert, setShowAlert] = useState(true);

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <>
      <StaticQuery
        query={query}
        render={({ allStoryblokEntry }) => {
          if (!allStoryblokEntry?.edges.length || hideAlerts) return null;
          return (
            <>
              {allStoryblokEntry.edges.map(({ node: { content, uuid } }) => {
                const blok = JSON.parse(content);
                // eslint-disable-next-line dot-notation
                blok['_uid'] = uuid;
                return <SBAlert blok={blok} key={uuid} />;
              })}
            </>
          );
        }}
      />
      <AuthContext.Consumer>
        {({ isError }) => {
          if (!isError || !showAlert) return null;
          return (
            <Alert
              type="warning"
              label="Login Error"
              hasDismiss
              dismissFunction={handleDismiss}
            >
              We weren&apos;t able to log you in with your Stanford profile at
              this time. Please try again later.
              <br />
              If this issue persists, please{' '}
              <a
                href="https://stanford.service-now.com/it_services?id=sc_cat_item&sys_id=0d4e42301ba33410a61d41d5ec4bcbc7"
                className="su-text-black hocus:su-no-underline hocus:su-text-black"
              >
                submit a ticket.
              </a>
            </Alert>
          );
        }}
      </AuthContext.Consumer>
    </>
  );
};

export default GlobalAlert;
