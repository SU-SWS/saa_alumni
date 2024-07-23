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
      // Random ID to avoid collisions with other connectors.
      id: Math.random().toString(36).substr(2, 9),
    };

    /**
     * The refine function is used to update the search state.
     */
    const refine =
      (helper) =>
      ({ lat, lng, name }) => {
        connectorState.name = name;
        connectorState.lat = lat;
        connectorState.lng = lng;

        helper.setQueryParameter('aroundLatLng', [
          parseFloat(lat, 10),
          parseFloat(lng, 10),
        ]);
        helper.search();
      };

    /**
     * The clearRefinements function is used to clear the search state.
     */
    const clearRefinements = (helper) => () => {
      connectorState.name = null;
      connectorState.lat = null;
      connectorState.lng = null;

      helper.setQueryParameter('aroundLatLng', undefined);
      helper.search();
    };

    /**
     * The setRadius function is used to update the search radius.
     */
    const setRadius = (helper) => (newRadius) => {
      connectorState.radius = newRadius;
      helper.setQueryParameter('aroundRadius', newRadius);
      helper.search();
    };

    /**
     * The connector object is returned to the InstantSearch library.
     */
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

        if (uiState.radialGeoSearch) {
          state = state.setQueryParameter(
            'aroundRadius',
            connectorState.radius
          );
          if (uiState.radialGeoSearch.lat && uiState.radialGeoSearch.lng) {
            state = state.setQueryParameter('aroundLatLng', [
              parseFloat(uiState.radialGeoSearch.lat, 10),
              parseFloat(uiState.radialGeoSearch.lng, 10),
            ]);
          }
        }

        return state;
      },
      /**
       * This function is required for a widget to be taken in account for routing.
       * It will derive a uiState for this widget based on the existing uiState and
       * the search parameters applied.
       *
       * Here, we also use the UI state to update the internal connectorState for
       * each of the instances of the connector as the uiState is the source of truth.
       *
       * @param uiState - Current state.
       * @param widgetStateOptions - Extra information to calculate uiState.
       */
      getWidgetUiState(uiState, { searchParameters }) {
        const { aroundRadius, aroundLatLng } = searchParameters;

        // Return the UI state to the connector state for sharing across instances.
        // We're only interested in the name when the user has searched as the other
        // values are stored in the search parameters.
        if (uiState?.radialGeoSearch?.name && aroundLatLng) {
          connectorState.name = uiState.radialGeoSearch.name;
        }

        // Remove the name across instances for when the user clears the search.
        if (
          connectorState.name &&
          !uiState?.radialGeoSearch?.name &&
          !aroundLatLng
        ) {
          connectorState.name = null;
        }

        return {
          ...uiState,
          radialGeoSearch: {
            lat: aroundLatLng ? aroundLatLng[0] : null,
            lng: aroundLatLng ? aroundLatLng[1] : null,
            radius: aroundRadius,
            name: connectorState.name,
          },
        };
      },
      /**
       * Returns IndexRenderState of the current index component tree
       * to build the render state of the whole app.
       */
      getRenderState(renderState, renderOptions) {
        return {
          ...renderState,
          radialGeoSearch: this.getWidgetRenderState(renderOptions),
        };
      },
      /**
       * Returns the render state of the current widget to pass to the render function.
       * This function is called on the first render and every time the widget is rendered.
       *
       * The connectorState is used for the shared values across widget instances.
       */
      getWidgetRenderState(renderOptions) {
        const { helper } = renderOptions;
        const { state } = helper;

        // To ensure the helper function is passed to the action functions so that the same
        // helper instance is used across all instances of the application.
        return {
          refine: refine(helper),
          clearRefinements: clearRefinements(helper),
          setRadius: setRadius(helper),
          radius: state.aroundRadius,
          name: connectorState.name,
          lat: state.aroundLatLng ? state.aroundLatLng[0] : null,
          lng: state.aroundLatLng ? state.aroundLatLng[1] : null,
        };
      },
      /**
       * Called once before the first search.
       */
      init(initOptions) {
        const { helper } = initOptions;
        helper.setQueryParameter('aroundPrecision', precision);
        helper.setQueryParameter('getRankingInfo', 'true');
        renderFn(
          {
            ...this.getWidgetRenderState(initOptions),
            instantSearchInstance: initOptions.instantSearchInstance,
          },
          true
        );
      },
      /**
       * Called after each search response has been received.
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
       * Called when this widget is unmounted. Used to remove refinements set by
       * during this widget's initialization and life time.
       */
      dispose() {
        unmountFn();
      },
    };
  };
