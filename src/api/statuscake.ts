// This file is just to monitor that functions are working.
import connect from 'next-connect';

const handler = connect().get((req, res) => {
  res.status(200).send('Ok');
});

export default handler;
