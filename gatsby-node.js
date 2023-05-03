/* eslint-disable no-console */
const path = require('path');
const webpack = require('webpack');

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    const storyblokEntry = path.resolve('src/templates/storyblok-entry.js');
    // Omit non-page entities from page generation
    const contentTypesToOmit = [
      'alert',
      'event',
      'globalHeader',
      'localFooter',
      'masthead',
      'perk',
      'redirect', // NOTE: Redirects are are specifically generated below
      'registrationFormPage', // Note: Handled separately
      'membershipFormPage', // Note: Handled separately below
      'searchEntry',
      'searchKeywordBanner',
      'searchSuggestions',
      'tsContentTemplate',
      'verticalNavWrapper',
      'promoCodeBanner',
      'protectedContentItem',
    ];
    const omittedComponentsArray = JSON.stringify(contentTypesToOmit);

    // Content Pages
    // /////////////////////////////////////////////////////////////////////////
    resolve(
      graphql(
        `
          {
            allStoryblokEntry (filter: { field_component: { nin: ${omittedComponentsArray} } }) {
              edges {
                node {
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
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const entries = result.data.allStoryblokEntry.edges;
        entries.forEach((entry, index) => {
          let slug = `${entry.node.full_slug}`;
          slug = slug.replace(/^\/|\/$/g, '');
          const pagePath = entry.node.full_slug === 'home' ? '' : `${slug}/`;

          // Determine if the page is canonical, or is using a custom canonical URL.
          const content = JSON.parse(entry.node.content);
          let isCanonical = true;
          if (
            content.canonicalURL &&
            (content.canonicalURL.url || content.canonicalURL.cached_url)
          ) {
            isCanonical = false;
          }
          const noIndex = content.noIndex ? content.noIndex : false;

          createPage({
            path: `/${pagePath}`,
            component: storyblokEntry,
            context: {
              slug: entry.node.full_slug,
              story: entry.node,
              isCanonical,
              noIndex,
            },
          });
        });
      })
    );

    // Registration Form Pages
    // /////////////////////////////////////////////////////////////////////////
    resolve(
      graphql(
        `
          {
            allStoryblokEntry(
              filter: { field_component: { eq: "registrationFormPage" } }
            ) {
              edges {
                node {
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
            }
          }
        `
      ).then((result) => {
        // No registration page forms.
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const registrationEntries = result.data.allStoryblokEntry.edges;
        registrationEntries.forEach((registrationEntry, index) => {
          const slug = `${registrationEntry.node.full_slug}`;
          const pagePath = slug.replace(/^\/|\/$/g, '');

          const content = JSON.parse(registrationEntry.node.content);

          let isCanonical = true;
          if (
            content.canonicalURL &&
            (content.canonicalURL.url || content.canonicalURL.cached_url)
          ) {
            isCanonical = false;
          }
          const noIndex = content.noIndex ? content.noIndex : false;

          // Create the GG form page(s) only if the trip is published
          if (content.trip) {
            createPage({
              path: `/${pagePath}/form`,
              component: storyblokEntry,
              context: {
                slug: `${registrationEntry.node.full_slug}/form`,
                story: registrationEntry.node,
                isCanonical,
                noIndex,
              },
            });

            createPage({
              path: `/${pagePath}`,
              component: storyblokEntry,
              context: {
                slug: registrationEntry.node.full_slug,
                story: registrationEntry.node,
                isCanonical,
                noIndex,
                interstitial: true,
              },
            });
          }
        });
      })
    );

    // Membership Form Pages
    // /////////////////////////////////////////////////////////////////////////
    resolve(
      graphql(
        `
          {
            allStoryblokEntry(
              filter: { field_component: { eq: "membershipFormPage" } }
            ) {
              edges {
                node {
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
            }
          }
        `
      ).then((result) => {
        // No membership page forms.
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const membershipEntries = result.data.allStoryblokEntry.edges;
        membershipEntries.forEach((membershipEntry, index) => {
          const slug = `${membershipEntry.node.full_slug}`;
          const pagePath = slug.replace(/^\/|\/$/g, '');

          const content = JSON.parse(membershipEntry.node.content);

          let isCanonical = true;
          if (
            content.canonicalURL &&
            (content.canonicalURL.url || content.canonicalURL.cached_url)
          ) {
            isCanonical = false;
          }
          const noIndex = content.noIndex ? content.noIndex : false;

          // Create full payment form page
          createPage({
            path: `/${pagePath}/form`,
            component: storyblokEntry,
            context: {
              slug: `${membershipEntry.node.full_slug}/form`,
              story: membershipEntry.node,
              isCanonical,
              noIndex,
              membershipFullPayment: true,
            },
          });

          // Create installments form page
          createPage({
            path: `/${pagePath}/installment/form`,
            component: storyblokEntry,
            context: {
              slug: `${membershipEntry.node.full_slug}/installment/form`,
              story: membershipEntry.node,
              isCanonical,
              noIndex,
              membershipInstallments: true,
            },
          });

          // Create related contact selection interstitial page
          createPage({
            path: `/${pagePath}/related-contacts`,
            component: storyblokEntry,
            context: {
              slug: membershipEntry.node.full_slug,
              story: membershipEntry.node,
              isCanonical,
              noIndex,
              membershipRelatedContact: true,
            },
          });

          // Create type of registrant interstitial page
          createPage({
            path: `/${pagePath}`,
            component: storyblokEntry,
            context: {
              slug: membershipEntry.node.full_slug,
              story: membershipEntry.node,
              isCanonical,
              noIndex,
            },
          });
        });
      })
    );

    // Add Redirects pre-configured in Storyblok.
    // /////////////////////////////////////////////////////////////////////////
    resolve(
      graphql(
        `
          {
            allStoryblokEntry(
              filter: {
                field_enabled_boolean: { eq: true }
                field_component: { eq: "redirect" }
              }
            ) {
              edges {
                node {
                  name
                  field_to_string
                  field_from_string
                  field_enabled_boolean
                  field_statusCode_string
                  field_component
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const entries = result.data.allStoryblokEntry.edges;
        entries.forEach((entry, index) => {
          createRedirect({
            fromPath: entry.node.field_from_string,
            toPath: entry.node.field_to_string,
            force: true,
            redirectInBrowser: false,
            statusCode: Number(entry.node.field_statusCode_string),
          });
        });
      })
    );
  });
};

// Alter Gatsby's webpack config.
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        fs: false,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  });
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /postscribe/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

/**
 * Typing for when there is no content of such type.
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type StoryblokEntry implements Node {
      field_label_string: String!
      field_heading_string: String!
      field_type_string: String!
      field_to_string: String!
      field_from_string: String!
      field_enabled_boolean: Boolean!
      field_statusCode_string: String!
      field_keywords_string: String!
      field_hideFromFilter_boolean: Boolean!
    }
  `;
  createTypes(typeDefs);
};
