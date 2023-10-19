import { GiveGabNonce } from '../../../utilities/givegab/GiveGabNonce';

const paymentHandler = async (req, res) => {
  // Extract orgId and dssId from the URL parameters
  const { history } = req.params;
  const [orgId, dssId, scheduleId] = history.split('/');
  console.log('orgId:', orgId);
  console.log('dssId:', dssId);
  console.log('scheduleId:', scheduleId);
  const ggNonce = new GiveGabNonce();

  try {
    // Use orgId and dssId to fetch the nonce token
    const nonceToken = await ggNonce.getToken(orgId, dssId, scheduleId);

    console.log('NONCE TOKEN:', nonceToken);
    res.json({ ...nonceToken });
  } catch (err) {
    console.error('ERROR:', err);
    res.status(404).json({ error: 'Nonce token not found' });
  }
};

export default paymentHandler;
