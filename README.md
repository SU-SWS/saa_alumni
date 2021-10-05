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

### Netlify

Once your site is integrated with Netlify you can add contextual build variables for your site in the Netlify deploy settings.
We're currently using [netlify-plugin-contextual-env](https://github.com/cball/netlify-plugin-contextual-env) which means if you
want contextual env values for a variable named `GATSBY_STORYBLOK_TOKEN` in your builds you would define the following in Netlify:
- `GATSBY_STORYBLOK_TOKEN` = `THIS IS THE BASE VALUE THAT WILL BE USED IF NOT OVERRIDDEN WITH CONTEXT`
- `PRODUCTION_GATSBY_STORYBLOK_TOKEN` = `THIS VALUE WOULD BE USED IN PRODUCTION`
- `DEV_GATSBY_STORYBLOK_TOKEN` = `THIS VALUE WOULD BE USED FOR OUR DEV BRANCH DEPLOY`
- `DEPLOY_PREVIEW_GATSBY_STORYBLOK_TOKEN` = `THIS VALUE WOULD BE USED FOR OUR DEPLOY PREVIEWS FOR DEV AND PROD`

Make sure to add netlify deploy-preview to your github `dev` branch require status checks to ensure proper PR gating.

### Codeclimate

To add codeclimate checks log in to codeclimate and add your repository with `dev` as the default branch.
Go the codeclimate repo settings and install the Github pull request status updates. Now go back to Github
and make sure `codeclimate` is added to required Status Checks for the `dev` branch protection settings.

## Development Workflows

All general development work should be based off of the `dev` branch.
Branches should abide by the following branch name format: `{branch-type}/JIRA-###_optional-description-of-task`
where `branch-type` is `feature/`, `task/`, or `bug/` and `JIRA-###` corresponds with the Jira ticket number.
This will ensure that features get labeled and organized correctly in the release and connect to Jira appropriately.

- Create branch from `dev` following the above outlined branch naming conventions.
- Complete work in your branch.
- Create a pull request from your branch into `dev` branch. This will deploy a Netlify preview for your branch.
- On PR approval, **squash merge** your branch with the following merge commit message format: `JIRA-### | Brief description of work completed`.

Pull requests against dev will need to pass status checks for the following:
- lint
- test
- codeclimate
- Branch up to date with `dev`
- Netlify build/deploy preview

Pull requests merged into dev will kickoff a Netlify branch deploy for the `dev` branch.

## Release Workflow

To release code to production you will need to create a release branch from `dev` and make a pull request to `main`.
Including semver tags (`[major]`, `[minor]`, `[patch]`) will automatically add a semver label to the PR which will
determine how to increment semver during release. If no label is provided it will default to `patch`.

- Create branch from `dev` (or commit ref from `dev`) with `release/` prefix and optional semver tag (e.g. `release/completely-refactor-everything[major]`)
- Create a pull request from your `release/my-cool-release` branch into `main`
- On PR approval, do a standard **merge commit** into `main`

Merges to `main` will kickoff the following tasks:
- Semver version bump
- Publish github release
- Netlify production build and deploy
- Merge changes back into `dev`


## Hotfix Workflow

Hotfix workflows should only ever be used when there is a production bug that needs immediate attention and
there are changes in `dev` that are not ready for deployment.

- Create a `hotfix/` branch from `main`
- Complete the fix in your branch
- Create a pull request from your hotfix branch into `main`
- On PR approval, **squash merge** your branch with the following merge commit message format: `JIRA-### | Brief description of hotfix`.

Depending on the nature your hotfix and the history of `dev` you may need to to manually merge `main` back into `dev` to resolve merge conflicts.

Contribution / Collaboration
---

You are welcome to contribute functionality, bug fixes, or documentation to this module. If you would like to suggest a fix or new functionality you may add a new issue to the GitHub issue queue or you may fork this repository and submit a pull request. For more help please see [GitHub's article on fork, branch, and pull requests](https://help.github.com/articles/using-pull-requests)

### Component Organization in This Repo

#### Partials

TODO

#### View Modes for Components

TODO
