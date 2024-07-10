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
        const state = searchParameters;
        console.log('Search Params', searchParameters);
        searchParameters.setQueryParameter(
          'aroundRadius',
          connectorState.radius
        );
        searchParameters.setQueryParameter(
          'aroundPrecision',
          connectorState.precision
        );
        if (connectorState.lat !== null && connectorState.lng !== null) {
          searchParameters.setQueryParameter('aroundLatLng', [
            connectorState.lat,
            connectorState.lng,
          ]);
        }

        return state;
      },
      /**
       *
       * @param {*} uiState
       * @returns
       */
      getWidgetUiState(uiState) {
        return {
          ...uiState,
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
        const rndr =
          this &&
          this.getWidgetRenderState &&
          this.getWidgetRenderState(renderOptions);
        return {
          ...renderState,
          refine: rndr?.refine,
        };
      },
      /**
       *
       * @returns
       */
      getWidgetRenderState(renderOptions) {
        const { helper, results, instantSearchInstance } = renderOptions;

        console.log('Get Widget Render State', connectorState);
        return {
          refine: connectorState.refine(helper),
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
