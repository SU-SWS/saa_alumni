import { useCallback, useMemo } from 'react';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import {
  useQueryParams,
  NumberParam,
  ArrayParam,
  withDefault,
} from 'use-query-params';
import { useTripFilterDatasources } from './useTripFilterDatasources';
import { useTrips } from './useTrips';
import {
  filterTrips,
  buildFilterIndex,
  getFiltersForTrips,
} from '../utilities/filterTrips';

export const TRIP_FILTER_PAGE_SIZE = 10;

// Helper to return active filters array
export const getActiveFilters = (filterEntries = [], filterParams) => {
  const filters = filterParams
    ? filterEntries.filter((ds) => filterParams.includes(ds.value))
    : [];
  return filters.reduce((list, filter) => [...list, filter], []);
};

export const useTripFilters = (primaryFilter) => {
  // useStaticQuery to have access all trip data
  const allTrips = useTrips();

  // Trip Filter Datasources keyed by filter type
  const allFilters = useTripFilterDatasources();
  const filterIndex = useMemo(
    () => buildFilterIndex(allTrips, allFilters),
    [allTrips, allFilters]
  );

  // const location = useLocation();

  // URL query param filters
  const [params] = useQueryParams({
    page: withDefault(NumberParam, 1),
    'trip-region': ArrayParam,
    'trip-experience': ArrayParam,
    'trip-year': ArrayParam,
    'trip-month': ArrayParam,
    'trip-duration': ArrayParam,
  });
  const { page } = params;

  const queryFilters = useMemo(
    () => [
      ...getActiveFilters(allFilters['trip-region'], params['trip-region']),
      ...getActiveFilters(
        allFilters['trip-experience'],
        params['trip-experience']
      ),
      ...getActiveFilters(allFilters['trip-year'], params['trip-year']),
      ...getActiveFilters(allFilters['trip-month'], params['trip-month']),
      ...getActiveFilters(allFilters['trip-duration'], params['trip-duration']),
    ],
    [allFilters, params]
  );

  // TODO: Handle Primary Filter
  const activeFilters = queryFilters;

  // const filteredTrips = useMemo(
  //   () => getFilteredTrips(activeFilters, tripIndex),
  //   [activeFilters, tripIndex, getFilteredTrips]
  // );
  const trips = useMemo(
    () => filterTrips(allTrips, activeFilters),
    [allTrips, activeFilters]
  );

  console.log({ filteredTrips: trips });

  const remainingFilters = useMemo(() => {
    const availableFilters = getFiltersForTrips(trips, filterIndex);
    return availableFilters;
  }, [trips, filterIndex]);
  console.log({ remainingFilters });

  /**
   * Filtered list of trips
   * NOTE: individual filters are ORs while different filters are ANDs
   */
  // const trips = useMemo(() => {
  //   // Only filter if we need to
  //   if (!activeFilters.length) return allTrips;

  //   return filterTrips(allTrips, activeFilters);
  // }, [allTrips, activeFilters]);

  // const availableFilters = useMemo(() => {
  //   // Filter allFilters list to only those with remaining trips left
  // }, [allFilters, trips]);

  /**
   * NOTE: We'll probably need to return list of all filters by type with additional filter state: 'active'|'inactive'|'available' where:
   * - active: filter is currently selected
   * - inactive: filter is not selected and no additional trips are available
   * - available: filter is not selected and there are additional trips available
   */
  // Filtered list of available filter types and their associated datasources (including count)
  const filters = [];

  /**
   * URL query params will look like the following
   * /travel-study/destinations?trip-region=region1,region2&trip-experience=exp1,exp2&page=2
   * Get URL query params for the following:
   * - various filter types
   */
  /**
   * Generate dynamic filters for:
   * - year
   * - month
   */

  const toggleFilter = useCallback((filterType, filterValue) => undefined, []); // navigate with/without filter (ONLY if it matches an actual filter)
  
  const clearFilter = useCallback((filter) => filter, []); // Navigate with params removed. Unnecessary. Toggle
  const clearAllFilters = useCallback(() => undefined, []); // Should just navigate without page params
  const totalPages = useMemo(() => undefined, []);
  const setPage = useCallback((pg) => undefined, []);
  // Create getLink Helper to generate links with optional passed params
  
  console.log({
    params,
    activeFilters,
    trips,
  });

  return {
    // Filtered Trips
    trips,
    // Filters
    filters,
    toggleFilter,
    activeFilters,
    clearFilter,
    clearAllFilters,

    // Pagination
    page,
    totalPages,
    setPage,
  };
};
