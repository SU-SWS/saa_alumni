/**
 * Export Handler.
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('x-robots-tag', ['noindex', 'nofollow', 'nosnippet']);
  res.setHeader('x-content-type-options', 'nosniff');
  res.setHeader('x-xss-protection', '1; mode=block');
  res.setHeader('Cache-Control', ['max-age=300', 'private']);
  res.setHeader('Expires', new Date().toUTCString());
  res.setHeader('date', new Date().toUTCString());
  res.setHeader('accept-ranges', 'none');
  res.setHeader('vary', 'Accept-Encoding');

  const script = `
  alert('This is a test');
  `;

  // Trip.
  res.status(200).send(script);
}
