const path = require("path");
const webpack = require("webpack");

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    const storyblokEntry = path.resolve("src/templates/storyblok-entry.js");

    resolve(
      graphql(
        `
          {
            allStoryblokEntry {
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
          slug = slug.replace(/^\/|\/$/g, "");
          let pagePath = entry.node.full_slug === "home" ? "" : slug + "/";

          // Wire up the 404 page by setting the path to just 404 as Gatsby expects it.
          if (pagePath.match(/^404/)) {
            pagePath = "404";
          }

          // Wire up the 403 page by setting the path to just 403 as Gatsby expects it.
          if (pagePath.match(/^403/)) {
            pagePath = "403";
          }

          createPage({
            path: "/" + pagePath,
            component: storyblokEntry,
            context: {
              slug: entry.node.full_slug,
              story: entry.node,
            },
          });
        });
      })
    );

    // Add Redirects pre-configured in Storyblok.
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
        path: require.resolve("path-browserify"),
        fs: false,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  });
  if (stage === "build-html") {
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
    }
  `;
  createTypes(typeDefs);
};
