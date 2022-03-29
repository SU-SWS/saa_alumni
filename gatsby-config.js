const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config();

/**
 * Resolve relations for storyblok.
 */
const storyblokRelations = [
  'eventCard.eventPicker',
  'globalHeaderPicker.globalHeader',
  'localFooterPicker.localFooter',
  'mastheadPicker.masthead',
  'perkCard.perkPicker',
  'perkCardHorizontal.perkPicker',
  'storyCard.storyPicker',
  'alertPicker.alert',
  'verticalNav.verticalNav',
  'tripCard.trip',
  'tsContentPicker.contentPicker',
  'tripNotifyMe.trip',
  'tripNotifyMe.notifyMeText',
  'tripCustomJourneys.trip',
  'tripCustomJourneys.customJourneysText',
];

// Support for Gatsby CLI
let siteUrl = 'http://localhost:8000';

// Support for Production site builds.
if (process.env.CONTEXT === 'production') {
  siteUrl = process.env.URL;
}
// Support for non-production netlify builds (branch/preview)
else if (process.env.CONTEXT !== 'production' && process.env.NETLIFY) {
  siteUrl = process.env.DEPLOY_PRIME_URL;
}
// Support for Netlify CLI.
else if (process.env.NETLIFY_DEV === true) {
  siteUrl = 'http://localhost:64946';
}

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
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: '*', disallow: '/editor/' },
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
          allSitePage {
            edges {
              node {
                path
                pageContext
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
          `/travel-study/global-components/**`,
          `/test/**`,
          `/403-access-denied`,
        ],
        // eslint-disable-next-line consistent-return
        filterPages: (page, excludedRoute, tools) => {
          // Return true excludes the path, false keeps it.
          if (
            // Exclude non-canonical pages.
            !page.pageContext.isCanonical ||
            // Exclude pages marked with "noindex"
            page.pageContext.noIndex ||
            // Exclude pages that match the "excludes" array. (default condition)
            tools.minimatch(
              tools.withoutTrailingSlash(tools.resolvePagePath(page)),
              tools.withoutTrailingSlash(excludedRoute)
            )
          ) {
            return true;
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-TJ9MSJ3',

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: 'gatsby' },
      },
    },
    {
      /**
       * NOTE: This needs to be updated, but we need to address the way storyblok
       * links are resolved post v4.1.3. See the following PR comment for more details:
       * https://github.com/SU-SWS/saa_alumni/pull/202#issuecomment-938025770
       */
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: process.env.GATSBY_STORYBLOK_ACCESS_TOKEN,
        homeSlug: 'home',
        resolveRelations: storyblokRelations,
        resolveLinks: 'url',
        version: activeEnv === 'production' ? 'published' : 'draft',
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
