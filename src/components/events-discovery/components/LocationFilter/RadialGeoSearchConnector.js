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
       * This function is required for a widget to behave correctly when a URL is
       * loaded via e.g. Routing. It receives the current UiState and applied search
       * parameters, and is expected to return a new search parameters.
       *
       * @param searchParameters - Applied search parameters.
       * @param widgetSearchParametersOptions - Extra information to calculate next searchParameters.
       */
      getWidgetSearchParameters(searchParameters, { uiState }) {
        let state = searchParameters;

        console.group('getWidgetSearchParameters');
        console.log('Search Parameters', searchParameters);
        console.log('Other States', uiState);
        console.log('Connector State', connectorState);
        console.groupEnd();

        // Get state from the UI state and store it in the connector state.
        if (uiState.radialGeoSearch && uiState?.radialGeoSearch?.lat) {
          connectorState.name = uiState.radialGeoSearch?.name;
          connectorState.lat = uiState.radialGeoSearch?.lat;
          connectorState.lng = uiState.radialGeoSearch?.lng;
          connectorState.radius = uiState.radialGeoSearch.radius;
        }

        // Set the aroundRadius parameter.
        state = state.setQueryParameter('aroundRadius', connectorState.radius);
        // Add the precision parameter.
        state = state.setQueryParameter(
          'aroundPrecision',
          connectorState.precision
        );
        // Set the around lat/lng if they are defined.
        if (connectorState.lat && connectorState.lng) {
          state.setQueryParameter('aroundLatLng', [
            connectorState.lat,
            connectorState.lng,
          ]);
        }

        return state;
      },
      /**
       * This function is required for a widget to be taken in account for routing.
       * It will derive a uiState for this widget based on the existing uiState and
       * the search parameters applied.
       *
       * @param uiState - Current state.
       * @param widgetStateOptions - Extra information to calculate uiState.
       */
      getWidgetUiState(uiState, widgetStateOptions) {
        // console.group('getWidgetUiState');
        // console.log('UI State', uiState);
        // console.log('Other Parameters', widgetStateOptions);
        // console.groupEnd();
        return {
          ...uiState,
          radialGeoSearch: {
            ...uiState.radialGeoSearch,
            radius: connectorState.radius,
            name: connectorState.name,
            lat: connectorState.lat,
            lng: connectorState.lng,
          },
        };
      },
      /**
       * Returns IndexRenderState of the current index component tree
       * to build the render state of the whole app.
       */
      getRenderState(renderState, renderOptions) {
        console.group('getRenderState');
        console.log('Render State', renderState);
        console.log('Render Options', renderOptions);
        console.groupEnd();
        return {
          ...renderState,
          radialGeoSearch: {
            ...renderState.radialGeoSearch,
            ...this.getWidgetRenderState(renderOptions),
          },
        };
      },
      /**
       * Returns the render state of the current widget to pass to the render function.
       */
      getWidgetRenderState(renderOptions) {
        // console.group('getWidgetRenderState');
        // console.log('Render Options', renderOptions);
        // console.groupEnd();

        const { helper } = renderOptions;

        return {
          refine: connectorState.refine(helper),
          clearRefinements: connectorState.clearRefinements(helper),
          setRadius: connectorState.setRadius(helper),
          name: connectorState.name,
          radius: connectorState.radius,
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
        console.log('dispose');
        unmountFn();
      },
    };
  };
