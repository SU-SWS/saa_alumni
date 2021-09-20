const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

console.log(`Using environment config: '${activeEnv}'`);

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

/**
 * Resolve relations for storyblok.
 */
const storyblokRelations = [
  "eventCard.eventPicker",
  "localFooterPicker.localFooter",
  "mastheadPicker.masthead",
  "perkCard.perkPicker",
  "perkCardHorizontal.perkPicker",
  "storyCard.storyPicker",
  "alertPicker.alert",
  "verticalNav.verticalNav",
];

const siteUrl =
  process.env.GATSBY_SITE_URL ||
  (process.env.CONTEXT === "production"
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL);

module.exports = {
  siteMetadata: {
    title: `Stanford Alumni Association`,
    description: `Stanford Alumni Association`,
    author: `Stanford University Alumni Association`,
    siteUrl,

    // This key is for metadata only and can be statically queried
    storyblok: {
      resolveRelations: storyblokRelations,
    },
  },
  plugins: [
    `gatsby-plugin-fontawesome-css`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [
          { userAgent: "*", allow: "/" },
          { userAgent: "*", disallow: "/editor/" },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(filter: {context: {isCanonical: {eq: true}, noIndex: {eq: false}}}) {
            edges {
              node {
                path
                context {
                  isCanonical
                }
              }
            }
          }
        }
        `,
        resolvePages: ({ allSitePage: { edges: allPages } }) =>
          allPages.map((page) => ({ ...page.node })),
        excludes: [
          `/editor/**`,
          `/editor`,
          `/global-components/**`,
          `/test/**`,
          `/403`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-TJ9MSJ3",

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
      },
    },
    {
      resolve: "gatsby-source-storyblok",
      options: {
        accessToken: process.env.GATSBY_STORYBLOK_ACCESS_TOKEN,
        homeSlug: "home",
        resolveRelations: storyblokRelations,
        version: activeEnv === "production" ? "published" : "draft",
        // version: 'draft'  // would show any including drafts
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Stanford Alumni Association`,
        start_url: `/`,
        include_favicon: false,
        crossOrigin: `use-credentials`,
        icons: [],
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeSecurityHeaders: false,
      },
    },
    `gatsby-plugin-use-query-params`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
