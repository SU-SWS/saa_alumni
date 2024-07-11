/**
 * Custom Algolia plugin to handle the radial geosearch logic.
 */

const noop = () => {};

const debug = false;

/**
 * Algolia custom connector.
 */
export default (renderFn, unmountFn = noop) =>
  (widgetParams) => {
    const { radius, precision } = widgetParams;
    // A `connectorState` object is used to store information
    // that needs to be shared across multiple method calls.
    const connectorState = {
      radius,
      precision,
      name: null,
      lat: null,
      lng: null,
      refine:
        (helper) =>
        ({ lat, lng, name }) => {
          connectorState.name = name;
          connectorState.lat = lat;
          connectorState.lng = lng;
          helper.setQueryParameter('aroundLatLng', [lat, lng]);
          helper.search();
        },
      clearRefinements: (helper) => () => {
        connectorState.lat = null;
        connectorState.lng = null;
        connectorState.name = null;
        helper.setQueryParameter('aroundLatLng', undefined);
        helper.search();
      },
      setRadius: (helper) => (newRadius) => {
        connectorState.radius = parseInt(newRadius, 10);
        helper.setQueryParameter('aroundRadius', newRadius);
        helper.search();
      },
    };

    return {
      $$type: 'adapt.radialGeoSearch',
      /**
       *
       * @param {*} searchParameters
       * @param {*} param1
       * @returns
       */
      getWidgetSearchParameters(searchParameters, { uiState }) {
        let state = searchParameters;
        state = state.setQueryParameter('aroundRadius', connectorState.radius);
        state = state.setQueryParameter(
          'aroundPrecision',
          connectorState.precision
        );

        // If we find the `radialGeoSearch` key in the `uiState` object,
        // This is usually from the initial load.
        if (
          uiState.radialGeoSearch &&
          uiState.radialGeoSearch.lat !== null &&
          uiState.radialGeoSearch.lng !== null
        ) {
          const lat = parseFloat(uiState.radialGeoSearch.lat, 10);
          const lng = parseFloat(uiState.radialGeoSearch.lng, 10);
          connectorState.radius = parseInt(uiState.radialGeoSearch.radius, 10);
          connectorState.name = uiState.radialGeoSearch.name;
          connectorState.lat = lat;
          connectorState.lng = lng;
          state = state.setQueryParameter('aroundLatLng', [lat, lng]);
        }

        return state;
      },
      /**
       *
       * @param {*} uiState
       * @returns
       */
      getWidgetUiState(uiState, { searchParameters }) {
        return {
          ...uiState,
          radialGeoSearch: {
            radius: connectorState.radius,
            name: connectorState.name,
            lat: connectorState.lat,
            lng: connectorState.lng,
          },
        };
      },
      /**
       *
       * @param {*} renderState
       * @param {*} renderOptions
       * @returns
       */
      getRenderState(renderState, renderOptions) {
        return {
          ...renderState,
          radialGeoSearch: {
            radius: connectorState.radius,
            name: connectorState.name,
            lat: connectorState.lat,
            lng: connectorState.lng,
          },
        };
      },
      /**
       *
       * @returns
       */
      getWidgetRenderState(renderOptions) {
        const { helper, state, results, instantSearchInstance } = renderOptions;
        return {
          refine: connectorState.refine(helper),
          clearRefinements: connectorState.clearRefinements(helper),
          setRadius: connectorState.setRadius(helper),
          radius: connectorState.radius,
          name: connectorState.name,
          lat: connectorState.lat,
          lng: connectorState.lng,
        };
      },
      /**
       *
       * @param {*} initOptions
       */
      init(initOptions) {
        renderFn(
          {
            ...this.getWidgetRenderState(initOptions),
            instantSearchInstance: initOptions.instantSearchInstance,
          },
          true
        );
      },
      /**
       *
       * @param {*} renderOptions
       */
      render(renderOptions) {
        renderFn(
          {
            ...this.getWidgetRenderState(renderOptions),
            instantSearchInstance: renderOptions.instantSearchInstance,
          },
          false
        );
      },
      /**
       * Cleanup.
       */
      dispose() {
        unmountFn();
      },
    };
  };
