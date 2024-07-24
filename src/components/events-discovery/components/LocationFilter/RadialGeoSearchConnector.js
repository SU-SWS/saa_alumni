/**
 * Custom Algolia plugin to handle the radial geosearch logic.
 */

const noop = () => {};

/**
 * Algolia custom connector.
 */
export default (renderFn, unmountFn = noop) =>
  (widgetParams) => {
    const { radius, precision, primary } = widgetParams;

    // A `connectorState` object is used to store information
    // that needs to be shared across multiple method calls.
    const connectorState = {
      radius,
      precision,
      name: '',
      lat: null,
      lng: null,
      primary,
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

        helper.setQueryParameter('relevancyStrictness', 0);
        helper.setQueryParameter('aroundPrecision', precision);
        helper.setQueryParameter('aroundRadius', connectorState.radius);
        helper.setQueryParameter('aroundLatLng', [
          parseFloat(lat),
          parseFloat(lng),
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
      helper.setQueryParameter('relevancyStrictness', undefined);
      helper.setQueryParameter('aroundPrecision', undefined);
      helper.setQueryParameter('aroundRadius', undefined);
      helper.search();
    };

    /**
     * The setRadius function is used to update the search radius.
     *
     * @param helper - The Algolia helper instance.
     * @param newRadius - The new radius to set in meters.
     */
    const setRadius = (helper) => (newRadius) => {
      if (newRadius && newRadius > 0) {
        connectorState.radius = newRadius;
        helper.setQueryParameter('aroundRadius', newRadius);
        helper.search();
      } else {
        // Default to 100 miles if no radius is set or it failed to parse.
        connectorState.radius = 160000;
        helper.setQueryParameter('aroundRadius', 160000);
        helper.search();
      }
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
       *
       * @returns {SearchParameters} - The new search parameters.
       */
      getWidgetSearchParameters(searchParameters, { uiState }) {
        let state = searchParameters;

        // If there is nothing in the search params, but there is in the uiState, set it.
        if (!searchParameters.aroundLatLng && uiState.radialGeoSearch?.lat) {
          state = state.setQueryParameter('aroundLatLng', [
            parseFloat(uiState.radialGeoSearch.lat),
            parseFloat(uiState.radialGeoSearch.lng),
          ]);
          state = state.setQueryParameter('relevancyStrictness', 0);
          state = state.setQueryParameter(
            'aroundPrecision',
            connectorState.precision
          );
          state = state.setQueryParameter(
            'aroundRadius',
            uiState.radialGeoSearch.radius
          );

          // Also set the connectorState
          connectorState.name = uiState.radialGeoSearch.name;
          connectorState.radius = parseInt(uiState.radialGeoSearch.radius, 10);
          connectorState.lat = parseFloat(uiState.radialGeoSearch.lat);
          connectorState.lng = parseFloat(uiState.radialGeoSearch.lng);
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
      getWidgetUiState(uiState, { searchParameters }) {
        const { aroundRadius, aroundLatLng } = searchParameters;

        // No Search params. No need to update.
        if (!aroundLatLng) {
          return uiState;
        }

        // Only run on the primary plugin.
        if (!connectorState.primary) {
          return uiState;
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
       *
       * In InstantSearch, each widget you add registers its render state in one global object.
       * You need to specify how to store your widget render state in this global tree
       *
       * @param renderState - The render state of the index component tree.
       * @param renderOptions - The render options of the index component tree.
       */
      getRenderState(renderState, renderOptions) {
        return {
          ...renderState,
          radialGeoSearch: {
            [connectorState.id]: connectorState,
            primary: connectorState.primary
              ? connectorState
              : renderState?.radialGeoSearch?.primary,
          },
        };
      },
      /**
       * Returns the render state of the current widget to pass to the render function.
       * This function is called on the first render and every time the widget is rendered.
       *
       * The connectorState is used for the shared values across widget instances.
       *
       * @param renderOptions - The render options of the index component tree.
       * @param renderState - The render state of the index component
       */
      getWidgetRenderState(renderOptions) {
        const {
          helper,
          renderState,
          instantSearchInstance: { indexName },
        } = renderOptions;

        // Return only the primary widget render state.
        if (renderState[indexName]?.radialGeoSearch?.primary) {
          return renderState[indexName]?.radialGeoSearch?.primary;
        }

        if (!connectorState.refine) {
          connectorState.refine = refine(helper);
        }

        if (!connectorState.clearRefinements) {
          connectorState.clearRefinements = clearRefinements(helper);
        }

        if (!connectorState.setRadius) {
          connectorState.setRadius = setRadius(helper);
        }

        return connectorState;
      },
      /**
       * Called once before the first search.
       */
      init(initOptions) {
        const { helper } = initOptions;
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
