import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useQueryParams,
  NumberParam,
  ArrayParam,
  withDefault,
} from 'use-query-params';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { useTripFilterDatasources } from './useTripFilterDatasources';
import { useTrips } from './useTrips';
import {
  buildFilterIndex,
  filterTrips,
  filtersListToKeyedObj,
  getActiveFilters,
  getFiltersForTrips,
} from '../utilities/filterTrips';

export const TRIP_FILTER_PAGE_SIZE = 10;
const filterTypes = [
  { key: 'trip-region', name: 'Region' },
  { key: 'trip-year', name: 'Year' },
  { key: 'trip-month', name: 'Month' },
  { key: 'trip-experience', name: 'Experience' },
  { key: 'trip-duration', name: 'Duration' },
];

export const useTripFilters = (primaryFilter) => {
  /**
   * Base Trip/Filter Data
   */

  // useStaticQuery to have access all trip data
  const allTrips = useTrips();

  // Trip Filter Datasources keyed by filter type
  const allFilters = useTripFilterDatasources();
  // Additional trip indexed lookup table and value map
  const { filterIndex, filterMap } = useMemo(
    () => buildFilterIndex(allTrips, allFilters),
    [allTrips, allFilters]
  );

  /**
   * Filtering Data
   */

  // URL query param filters
  const queryConfig = {
    page: withDefault(NumberParam, 1),
    'trip-region': ArrayParam,
    'trip-experience': ArrayParam,
    'trip-year': ArrayParam,
    'trip-month': ArrayParam,
    'trip-duration': ArrayParam,
  };
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
    () => filtersListToKeyedObj(activeFilters),
    [activeFilters]
  );

  // Filtered list of trips
  const trips = useMemo(
    () => filterTrips(allTrips, activeFilters),
    [allTrips, activeFilters]
  );

  // List of keyed/ordered filters with flags for selected/available/primary
  const filters = useMemo(() => {
    const availableFiltersObj = getFiltersForTrips(trips, filterIndex);
    const filtersWithStatus = filterTypes.map(({ key, name }) => {
      let availableTrips = {};
      let typeIsActive = false;
      const typeFilters = allFilters[key].map((filter) => {
        const selected = !!activeFiltersIndex?.[key]?.[filter.value];
        const available = Object.keys(
          availableFiltersObj?.[key]?.[filter.value] || {}
        ).length;

        if (selected) {
          typeIsActive = true;
        }
        if (available) {
          availableTrips = {
            ...availableTrips,
            ...availableFiltersObj[key][filter.value],
          };
        }
        return {
          ...filter,
          selected,
          available,
          primary: false,
        };
      });

      return {
        key,
        name,
        active: typeIsActive,
        available: Object.keys(availableTrips).length,
        filters: typeFilters,
      };
    });

    return filtersWithStatus;
  }, [trips, filterIndex, allFilters, activeFiltersIndex]);

  /**
   * Filtering Actions
   */

  // navigate with/without filter (ONLY if it matches an actual filter)
  // NOTE: We ALWAYS reset pagination on filter change
  const toggleFilter = useCallback(
    (filterType, filterValue) => {
      // Make sure we have a valid filter
      if (filterMap[filterType]?.[filterValue]) {
        // Are we enabling or disabling the filter?
        const isActive = !!activeFiltersIndex?.[filterType]?.[filterValue];

        if (isActive) {
          // Disable filter
          setQuery({
            ...params,
            [filterType]: params[filterType].filter(
              (filter) => filter !== filterValue
            ),
            page: 1,
          });
        } else {
          // Enable Filter
          setQuery({
            ...params,
            [filterType]: [...(params[filterType] || []), filterValue],
            page: 1,
          });
        }
      }
    },
    [filterMap, activeFiltersIndex, setQuery, params]
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
  const totalPages = useMemo(
    () => Math.ceil(trips.length / TRIP_FILTER_PAGE_SIZE),
    [trips]
  );
  // NOTE: We may want to expose a function that simply generates the page link rather than handling it programmatically
  const setPage = useCallback(
    (pageNum) => {
      setQuery({ page: pageNum });
      scrollTo('body');
    },
    [setQuery]
  );
  // Create getLink Helper to generate links with optional passed params?

  return {
    // Filtered Trips
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
    setPage,
  };
};
