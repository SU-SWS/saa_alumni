import { useConnector } from 'react-instantsearch-core';
import RadialGeoSearchConnector from './RadialGeoSearchConnector';

const useRadialGeoSearch = (props, additionalWidgetProperties) => {
  const defaults = {
    primary: false,
    radius: 160000,
    precision: 1000,
  };
  const { radius, precision, primary } = { ...defaults, ...props };
  const connect = useConnector(
    RadialGeoSearchConnector,
    {
      radius,
      precision,
      primary,
    },
    additionalWidgetProperties
  );
  return connect;
};

export default useRadialGeoSearch;
