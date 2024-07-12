import { useConnector } from 'react-instantsearch-core';
import RadialGeoSearchConnector from './RadialGeoSearchConnector';

const useRadialGeoSearch = (props) => {
  const defaults = {
    radius: 160000,
    precision: 1000,
  };
  const { radius, precision } = { ...defaults, ...props };
  const connect = useConnector(RadialGeoSearchConnector, {
    radius,
    precision,
  });
  return connect;
};

export default useRadialGeoSearch;
