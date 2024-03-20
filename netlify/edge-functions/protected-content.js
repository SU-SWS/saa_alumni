export default async (req, { cookies }) => {
  // Check for a session cookie.
  if (cookies.get('adapt-auth-session')) {
    // Pass-through.
    return;
  }

  // Redirect to login.
  const url = new URL('/api/auth/login', req.url);
  const sourceURL = new URL(req.url);
  url.searchParams.set('final_destination', sourceURL.pathname);
  // eslint-disable-next-line consistent-return
  return Response.redirect(url);
};
