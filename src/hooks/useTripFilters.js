import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useQueryParams,
  NumberParam,
  ArrayParam,
  withDefault,
} from 'use-query-params';
import { encodeQueryParams } from 'serialize-query-params';
import { stringify } from 'query-string';
import { useLocation } from '@reach/router';
import { useTripFilterDatasources } from './useTripFilterDatasources';
import { useTrips } from './useTrips';
import {
  buildFacetIndex,
  filterTrips,
  facetListToKeyedObj,
  getActiveFilters,
} from '../utilities/filterTrips';

export const TRIP_FILTER_PAGE_SIZE = 16;
const filterTypes = [
  { key: 'trip-region', name: 'Region' },
  { key: 'trip-year', name: 'Year' },
  { key: 'trip-month', name: 'Month' },
  { key: 'trip-experience', name: 'Experience' },
  { key: 'trip-duration', name: 'Duration' },
];

// URL query param filters
const queryConfig = {
  page: withDefault(NumberParam, 1),
  'trip-region': ArrayParam,
  'trip-experience': ArrayParam,
  'trip-year': ArrayParam,
  'trip-month': ArrayParam,
  'trip-duration': ArrayParam,
};

export const useTripFilters = (primaryFilter) => {
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

  // TODO: Handle Primary Filter
  const activeFilters = queryFilters;
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
        count: availableFacets?.[key]?.count || 0,
        facets: allFilters[key].map((facet) => ({
          ...facet,
          active:
            availableFacets?.[key]?.facets?.[facet.value]?.active || false,
          count: availableFacets?.[key]?.facets?.[facet.value]?.count || 0,
        })),
      })),
    [availableFacets, allFilters]
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
      const encodedParams = stringify(
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
    activeFilters,
    toggleFilter,
    clearFilterType,
    clearAllFilters,

    // Pagination
    page,
    totalPages,
    getPageLink,
  };
};
