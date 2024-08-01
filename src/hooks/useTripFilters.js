import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useQueryParams,
  NumberParam,
  ArrayParam,
  withDefault,
} from 'use-query-params';
import { encodeQueryParams } from 'serialize-query-params';
import queryString from 'query-string';
import { useLocation } from '@reach/router';
import { useTripFilterDatasources } from './useTripFilterDatasources';
import { useTrips } from './useTrips';
import {
  buildFacetIndex,
  filterTrips,
  facetListToKeyedObj,
  getActiveFilters,
  filterTypes,
} from '../utilities/filterTrips';

export const TRIP_FILTER_PAGE_SIZE = 16;

// URL query param filters
const queryConfig = {
  page: withDefault(NumberParam, 1),
  'trip-region': ArrayParam,
  'trip-experience': ArrayParam,
  'trip-year': ArrayParam,
  'trip-month': ArrayParam,
  'trip-duration': ArrayParam,
};

export const useTripFilters = (primaryPageFilter = {}) => {
  /**
   * Base Trip/Filter Data
   */

  // useStaticQuery to have access all trip data
  const allTrips = useTrips();

  // Trip Filter Datasources keyed by filter type
  const allFilters = useTripFilterDatasources();
  // Additional trip indexed lookup table and value map
  const { facetIndex, facetMap } = useMemo(
    () => buildFacetIndex(allTrips, allFilters),
    [allTrips, allFilters]
  );

  /**
   * Filtering Data
   */
  const [params, setQuery] = useQueryParams(queryConfig);
  const { page } = params;
  const primaryFilter = useMemo(() => {
    const { datasource, value } = primaryPageFilter;
    // Verify filter
    const filter = allFilters[datasource]?.find(
      (facet) => facet.value === value
    );

    return filter;
  }, [primaryPageFilter, allFilters]);

  // Wait until first mount to return data to prevent poor hydration
  const [mounted, setMounted] = useState();
  useEffect(() => setMounted(true), []);

  const queryFilters = useMemo(
    () =>
      mounted
        ? [
            ...getActiveFilters(
              allFilters['trip-region'],
              params['trip-region']
            ),
            ...getActiveFilters(
              allFilters['trip-experience'],
              params['trip-experience']
            ),
            ...getActiveFilters(allFilters['trip-year'], params['trip-year']),
            ...getActiveFilters(allFilters['trip-month'], params['trip-month']),
            ...getActiveFilters(
              allFilters['trip-duration'],
              params['trip-duration']
            ),
          ]
        : [],
    [allFilters, params, mounted]
  );

  const activeFilters = useMemo(
    () => (primaryFilter ? [primaryFilter, ...queryFilters] : queryFilters),
    [queryFilters, primaryFilter]
  );
  const activeFiltersIndex = useMemo(
    () => facetListToKeyedObj(activeFilters),
    [activeFilters]
  );

  // Filtered list of trips
  const { filteredTrips, availableFacets } = useMemo(
    () => filterTrips(allTrips, activeFilters, facetIndex),
    [allTrips, activeFilters, facetIndex]
  );
  // Paginate trips
  const trips = useMemo(
    () =>
      filteredTrips.slice(
        (page - 1) * TRIP_FILTER_PAGE_SIZE,
        page * TRIP_FILTER_PAGE_SIZE
      ),
    [filteredTrips, page]
  );
  const totalPages = useMemo(
    () => Math.ceil(filteredTrips.length / TRIP_FILTER_PAGE_SIZE),
    [filteredTrips]
  );

  // List of keyed/ordered filters with flags for active/trip count
  const filters = useMemo(
    () =>
      filterTypes.map(({ key, name }) => ({
        key,
        name,
        active: availableFacets?.[key]?.active || false,
        primary: primaryFilter && primaryFilter.datasource === key,
        count: availableFacets?.[key]?.count || 0,
        facets: allFilters[key].map((facet) => ({
          ...facet,
          active:
            availableFacets?.[key]?.facets?.[facet.value]?.active || false,
          primary:
            primaryFilter &&
            primaryFilter.datasource === key &&
            primaryFilter.value === facet.value,
          count: availableFacets?.[key]?.facets?.[facet.value]?.count || 0,
        })),
      })),
    [availableFacets, allFilters, primaryFilter]
  );

  /**
   * Filtering Actions
   */

  // navigate with/without filter (ONLY if it matches an actual filter)
  // NOTE: We ALWAYS reset pagination on filter change
  const toggleFilter = useCallback(
    (filterType, facetValue) => {
      // Make sure we have a valid filter facet
      if (facetMap[filterType]?.[facetValue]) {
        // Are we enabling or disabling the filter?
        const isActive = !!activeFiltersIndex?.[filterType]?.[facetValue];

        if (isActive) {
          // Disable filter
          setQuery({
            ...params,
            [filterType]: params[filterType].filter(
              (filter) => filter !== facetValue
            ),
            page: 1,
          });
        } else {
          // Enable Filter
          setQuery({
            ...params,
            [filterType]: [...(params[filterType] || []), facetValue],
            page: 1,
          });
        }
      }
    },
    [facetMap, activeFiltersIndex, setQuery, params]
  );
  const clearFilterType = useCallback(
    (filterType) => {
      // Only Clear if existing filters already checked
      if (params[filterType]) {
        setQuery({
          ...params,
          [filterType]: undefined,
          page: 1,
        });
      }
    },
    [params, setQuery]
  );
  const clearAllFilters = useCallback(
    () =>
      setQuery({
        page: undefined,
        'trip-region': [],
        'trip-experience': [],
        'trip-year': [],
        'trip-month': [],
        'trip-duration': [],
      }),
    [setQuery]
  );

  /**
   * Pagination
   */
  // Create getLink Helper to generate links with optional passed params
  const location = useLocation();
  const getPageLink = useCallback(
    (pg = 1) => {
      const encodedParams = queryString.stringify(
        encodeQueryParams(queryConfig, { ...params, page: pg })
      );

      return `${location.pathname}?${encodedParams}`;
    },
    [location.pathname, params]
  );

  return {
    // Filtered Trips
    filteredTrips,
    trips,

    // Filters
    filters,
    activeFilters: queryFilters,
    toggleFilter,
    clearFilterType,
    clearAllFilters,

    // Pagination
    page,
    totalPages,
    getPageLink,
  };
};
