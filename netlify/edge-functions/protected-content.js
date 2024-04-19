export default async (req, { cookies }) => {
  // Check for a session cookie.
  if (cookies.get('adapt-auth-session')) {
    // Pass-through.
    return;
  }

  // Redirect to login.
  const url = new URL('/api/auth/login', req.url);
  const { pathname, search, hash } = new URL(req.url);
  const finalDestination = `${pathname}${search}${hash}`;
  url.searchParams.set('final_destination', finalDestination);
  // eslint-disable-next-line consistent-return
  return Response.redirect(url);
};
