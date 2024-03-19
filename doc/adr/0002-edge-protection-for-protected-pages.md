# 2. Edge protection for protected pages

Date: 2024-03-19

## Status

Accepted

## Context

Protected pages are pages that should only be available to authenticated users. Prior to the availability of edge functions
the content was protected by a React component that required user authentication before client side fetching/rendering the
content.

## Decision

We will use Netlify Edge functions directly to check for the auth cookie set by adapt-auth-sdk vs Gatsby functions as we are on
Gatsby 4 and don't plan on upgrading. The edge function will just check for the adapt-auth-session cookie and redirect to login
if it does not exist. The adapt-auth-session cookie was changed from a `Strict` cookie to a `LAX` cookie as the redirect after
authentication was not providing the cookie to the edge function. See the thread at See the thread of comments at https://github.com/SU-SWS/saa_alumni/pull/820#pullrequestreview-1935373251 for more details.

The known paths of protected content have been added to Netlify.toml for where and when the edge function should validate the cookie.

## Consequences

* Redirect to auth should be faster
* No html, javascript, or content is sent to the browser during the auth check preventing leaks
* Edge function usage will go up moderately
* If the paths change, so have to the paths in the TOML
* Where the edge functions run is not dynamic as the it is hard coded in the TOML file
* Content authors can still create protected pages in Storyblok and they will only have the React protected component check.
* Setting the adapt-auth-session cookie to LAX will open that cookie up to being sent around the Stanford.edu namespace so someone could technically spoof it but the validation happens on the adapt-auth cookie so there isn't a big concern around this today.

