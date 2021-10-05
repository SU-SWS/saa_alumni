# Storyblok Components

This directory contains our Storyblok component schemas as pulled from the dev space.
If you update a Storyblok component during your work please update the schema file.

## Pull Components

To generate the updated component schema do the following:

Set an environment variable to the storyblok DEV space...
```
> export STORYBLOK_SPACE_ID="THE_SAA_DEV_SPACE_ID"
```

and run the npm script

```
> npm run sb:pull
```

This will update the Storyblok component schema and preset files stored in the `storyblok/` directory.

## Push Components

We have not integrated pushing components back to the production space at this time.