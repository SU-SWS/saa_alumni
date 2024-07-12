import { useConnector } from 'react-instantsearch-core';
import RadialGeoSearchConnector from './RadialGeoSearchConnector';

export default function (radius = 160000, precision = 1000) {
  console.log('rendering useRadialGeoSearch');
  return useConnector(RadialGeoSearchConnector, {
    radius,
    precision,
  });
}
