# [ADAPT SAA Alumni](https://github.com/SU-SWS/saa_alumni)
##### Version: 1.0.0

<a href="https://codeclimate.com/github/SU-SWS/saa_alumni/maintainability"><img src="https://api.codeclimate.com/v1/badges/6545d64d90025f75e2c8/maintainability" /></a>

[![Netlify Status](https://api.netlify.com/api/v1/badges/ce1b5cc8-4507-46b9-9416-dae43ce65989/deploy-status)](https://app.netlify.com/sites/stanford-alumni/deploys)

Changelog: [Changelog.md](CHANGELOG.md)

Description
---

Netlify hosted, Gatsby built, storyblok headless cms site for alumni.stanford.edu


Installation
---

*Development*
```
cp example.env .env.development
* Get the Storyblok preview access token *
* Get the FontAwesome NPM token from the Netlify site settings in environment variables *
* Manually add the access tokens to .env.development *
nvm use
FONTAWESOME_NPM_AUTH_TOKEN=MYFATOKEN npm install
gatsby develop
```

*Production*
```
cp example.env .env.production
* Get the Storyblok public access token *
* Get the FontAwesome NPM token from the Netlify site settings in environment variables *
* Manually add the access tokens to .env.production and remove the `GATSBY_HOT_LOADER=fast-refresh line`*
nvm use
FONTAWESOME_NPM_AUTH_TOKEN=MYFATOKEN npm install
gatsby build
```

Connecting to Storyblok
---

You will need an access token to connect to a storyblok space. Contact a member on the project team to get one. Once you have obtained a key you will need to add it to your local environment file. In `.env.development` and/or `.env.production` add the value of the access key to the `GATSBY_STORYBLOK_ACCESS_TOKEN` variable. `Development` builds can use the `preview` access tokens from Storyblok, but `Production` builds should only ever use the `public` access tokens. This is to ensure no unpublished content is accidentally revealed to the public.

Development vs Production builds.
---

This project makes use of the NODE_ENV environment variable to run different builds. We also use `.env.*` files to pass through configuration options.

Troubleshooting
---

If you are experiencing issues with this module try reverting the feature first. If you are still experiencing issues try posting an issue on the GitHub issues page.

Developer
---

### Preview environment
- How to.

### Production deployment
- How to.

Contribution / Collaboration
---

You are welcome to contribute functionality, bug fixes, or documentation to this module. If you would like to suggest a fix or new functionality you may add a new issue to the GitHub issue queue or you may fork this repository and submit a pull request. For more help please see [GitHub's article on fork, branch, and pull requests](https://help.github.com/articles/using-pull-requests)

### Component Organization in This Repo

#### Partials

TODO

#### View Modes for Components

TODO
