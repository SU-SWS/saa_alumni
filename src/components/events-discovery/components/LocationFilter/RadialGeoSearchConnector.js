/**
 * Custom Algolia plugin to handle the radial geosearch logic.
 */

const noop = () => {};

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
      lat: null,
      lng: null,
      refine:
        (helper) =>
        ({ lat, lng }) => {
          console.log('Refining to', lat, lng);
          connectorState.lat = lat;
          connectorState.lng = lng;
          helper.setQueryParameter('aroundLatLng', [lat, lng]);
          helper.search();
        },
      clearRefinements: (helper) => () => {
        console.log('Clearing refinements');
        connectorState.lat = null;
        connectorState.lng = null;
        helper.setQueryParameter('aroundLatLng', null);
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
        console.log(
          'Get Widget Search Parameters',
          searchParameters,
          uiState,
          connectorState
        );
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
        console.log('Get Widget UI State', uiState, searchParameters);
        return {
          ...uiState,
          radialGeoSearch: {
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
        console.log('Get Render State', renderState, renderOptions);
        return {
          ...renderState,
          radialGeoSearch: {
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
        console.log('Get Widget Render State', renderOptions);
        return {
          refine: connectorState.refine(helper),
          clearRefinements: connectorState.clearRefinements(helper),
          radialGeoSearch: {
            lat: connectorState.lat,
            lng: connectorState.lng,
          },
        };
      },
      /**
       *
       * @param {*} initOptions
       */
      init(initOptions) {
        console.log('Init', initOptions);
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
        console.log('Render', renderOptions);
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
