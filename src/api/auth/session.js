import connect from 'next-connect';
import { authInstance } from '../../utilities/authInstance';

const handler = connect()
  .use(authInstance.authorize())
  .get((req, res) => {
    res.json(req.user);
  });

export default handler;
