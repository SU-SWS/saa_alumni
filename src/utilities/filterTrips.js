// Helper to return active filters array
export const getActiveFilters = (filterEntries = [], filterParams) => {
  const filters = filterParams
    ? filterEntries.filter((ds) => filterParams.includes(ds.value))
    : [];
  return filters.reduce((list, filter) => [...list, filter], []);
};

// NOTE: These are the month values for storyblok datasource "trip-month"
const monthValues = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];
export const filterTypes = [
  { key: 'trip-region', name: 'Region' },
  { key: 'trip-year', name: 'Year' },
  { key: 'trip-month', name: 'Month' },
  { key: 'trip-experience', name: 'Experience' },
  { key: 'trip-duration', name: 'Duration' },
];
const allFilterTypes = filterTypes.map(({ key }) => key);

export const drillDownFilterTypes = ['trip-experience'];
/**
 * Helper function to generate array of month values between 2 dates
 */
export const getTripMonth = (startDate) => {
  const tripStartMonth = startDate.getMonth();
  return [monthValues[tripStartMonth]];
};

/**
 * Helper function to get array of year values between 2 dates
 */
export const getTripYear = (startDate) => {
  const tripStartYear = startDate.getFullYear();
  return [tripStartYear.toString()];
};

/**
 * Helper function to get inclusive number of days between 2 dates
 */
export const getTripDuration = (startDate, endDate) =>
  (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

/**
 * Helper function to determine trip duration filter
 * NOTE: Duration filter values are in the form {minDays}-{maxDays}
 */
export const tripWithinDuration = (durationInDays, durationFilter) => {
  const [min, max] = durationFilter.split('-').map((s) => parseInt(s, 10));

  if (min && max) return min <= durationInDays && durationInDays <= max;
  if (min) return min <= durationInDays;
  if (max) return durationInDays <= max;
  return false;
};

/**
 * Determine trip filterability given a list of facets for a given filterType
 */
export const tripMatchesFilterType = (trip, filterType, filters = []) => {
  // No filters means it matches
  if (filters.length === 0) return true;

  const tripStartDate = new Date(trip.content.startDate);
  const tripEndDate = new Date(trip.content.endDate);
  const tripYears = getTripYear(tripStartDate);
  const tripMonths = getTripMonth(tripStartDate);
  const tripDurationDays = getTripDuration(tripStartDate, tripEndDate);

  switch (filterType) {
    case 'trip-region':
      // TODO: This will change at some point
      return (
        filters.find((filter) => filter.value === trip.content.region) !==
        undefined
      );
    case 'trip-experience':
      // Filter matches when all experiences match (drill-down)
      return filters.reduce(
        (matches, filter) =>
          matches && (trip.content.experiences || []).includes(filter.value),
        true
      );
    case 'trip-year':
      return (
        filters.find((filter) => tripYears.includes(filter.value)) !== undefined
      );
    case 'trip-month':
      return (
        filters.find((filter) => tripMonths.includes(filter.value)) !==
        undefined
      );
    case 'trip-duration':
      return (
        filters.find((filter) =>
          tripWithinDuration(tripDurationDays, filter.value)
        ) !== undefined
      );
    default:
      return false;
  }
};

/**
 * Trip sorting function sorts trips chronologically by startDate,
 * while boosting by presence of priority tags
 */
const tripSorter = (a, b) => {
  // Handle Priority tag sorting first
  // NOTE: Reverse Priority order for sorting; higher idx = higher precedence
  const priorityTags = ['Staff Pick', 'New'];
  if (
    priorityTags.includes(a.content.tag) ||
    priorityTags.includes(b.content.tag)
  ) {
    const sortDiff =
      priorityTags.indexOf(b.content.tag) - priorityTags.indexOf(a.content.tag);

    // If tags are the same, fall through to startDate
    if (sortDiff !== 0) return sortDiff;
  }

  // Sort by startDate
  return (
    new Date(a.content.startDate).getTime() -
    new Date(b.content.startDate).getTime()
  );
};

/**
 * Helper to transform list of facets into object keyed by [filterType][facet.value]
 */
export const facetListToKeyedObj = (filterList) =>
  filterList.reduce(
    (agg, filter) => ({
      ...agg,
      [filter.datasource]: {
        ...(agg[filter.datasource] || {}),
        [filter.value]: filter,
      },
    }),
    {}
  );

/**
 * Get filtered list of Trips and available facets with trip counts
 */
export const filterTrips = (allTrips, activeFilters = [], facetIndex) => {
  const activeFacetsByType = facetListToKeyedObj(activeFilters);
  const filteredTrips = [];
  const availableFacets = {};

  // Inline helper to add trips to filter facets
  const addTripToFacet = ({
    facet: { datasource: filterType, value },
    active = undefined,
    addToFilterType = false,
  }) => {
    availableFacets[filterType] = {
      ...(availableFacets[filterType] || {}),
      ...(active ? { active } : {}),
      count:
        (availableFacets?.[filterType]?.count || 0) + (addToFilterType ? 1 : 0),
      facets: {
        ...(availableFacets?.[filterType]?.facets || {}),
        [value]: {
          ...(availableFacets?.[filterType]?.facets?.[value] || {}),
          ...(active ? { active } : {}),
          count:
            (availableFacets?.[filterType]?.facets?.[value]?.count || 0) + 1,
        },
      },
    };
  };

  allTrips.forEach((trip) => {
    // Determine if trip matches for each of the filter types
    const tripFilterTypeMatches = allFilterTypes.reduce(
      (obj, filterType) => ({
        ...obj,
        [filterType]: tripMatchesFilterType(
          trip,
          filterType,
          Object.values(activeFacetsByType[filterType] || [])
        ),
      }),
      {}
    );

    // Determine if trip matches all active filters
    const tripMatchesAllActiveFilters = Object.values(
      tripFilterTypeMatches
    ).reduce((matchesAll, matchesType) => matchesAll && matchesType, true);
    // Add trip if it matches
    if (tripMatchesAllActiveFilters) {
      filteredTrips.push(trip);
    }

    // Now to determine the active facets with trip count...

    // Get all filters for this trip
    const tripFacets = facetIndex[trip.id];
    const tripAddedForFilterType = {};

    // Determine if this trip should be added as available for each of it's facets
    tripFacets.forEach((facet) => {
      const facetIsActive =
        !!activeFacetsByType?.[facet.datasource]?.[facet.value];

      // Active facet
      if (facetIsActive && tripMatchesAllActiveFilters) {
        addTripToFacet({
          facet,
          active: true,
          addToFilterType: !tripAddedForFilterType[facet.datasource],
        });
        tripAddedForFilterType[facet.datasource] = true;
      }

      // Inactive facet
      if (!facetIsActive) {
        const tripMatchesOtherFilterTypes = allFilterTypes.reduce(
          (matchesOthers, filterType) =>
            matchesOthers &&
            (facet.datasource === filterType ||
              tripFilterTypeMatches[filterType]),
          true
        );

        // Drill-down filter types
        if (drillDownFilterTypes.includes(facet.datasource)) {
          if (
            tripMatchesOtherFilterTypes &&
            tripFilterTypeMatches[facet.datasource]
          ) {
            addTripToFacet({
              facet,
              addToFilterType: !tripAddedForFilterType[facet.datasource],
            });
            tripAddedForFilterType[facet.datasource] = true;
          }
        } else if (tripMatchesOtherFilterTypes) {
          // Expand filter types
          addTripToFacet({
            facet,
            addToFilterType: !tripAddedForFilterType[facet.datasource],
          });
          tripAddedForFilterType[facet.datasource] = true;
        }
      }
    });
  });

  filteredTrips.sort(tripSorter);

  return { filteredTrips, availableFacets };
};

/**
 * Get duration filter value for a trip
 */
export const getTripDurationFilters = (trip, durationFilters) => {
  const startDate = new Date(trip.content.startDate);
  const endDate = new Date(trip.content.endDate);
  const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

  const matchingFilters = durationFilters.filter((filter) =>
    tripWithinDuration(duration, filter.value)
  );
  return matchingFilters.map((filter) => filter.value);
};

// Given a trip, determine the filter facetss that it matches
export const getTripFacets = (trip, allFilters) => {
  const startDate = new Date(trip.content.startDate);

  const { region, experiences } = trip.content;
  const year = getTripYear(startDate);
  const month = getTripMonth(startDate);
  const duration = getTripDurationFilters(trip, allFilters['trip-duration']);

  return {
    'trip-region': [region],
    'trip-experience': experiences,
    'trip-year': year,
    'trip-month': month,
    'trip-duration': duration,
  };
};

/**
 * Builds trip filter facet index for faster, more performant access to facets-by-trip
 */
export const buildFacetIndex = (allTrips, allFilters) => {
  // Map filters by type/value
  const facetMap = Object.keys(allFilters).reduce(
    (agg, filterType) => ({
      ...agg,
      [filterType]: allFilters[filterType].reduce(
        (filterAgg, filter) => ({
          ...filterAgg,
          [filter.value]: filter,
        }),
        {}
      ),
    }),
    {}
  );
  const facetIndex = {};

  allTrips.forEach((trip) => {
    // map trip by id
    facetIndex[trip.id] = [];

    // Get Filter facetss associated with trip
    const filters = getTripFacets(trip, allFilters);

    Object.keys(filters).forEach((filterType) => {
      filters[filterType].forEach((facetValue) => {
        // Index facets by tripId
        const facet = facetMap?.[filterType]?.[facetValue];
        if (facet) {
          facetIndex[trip.id].push(facet);
        }
      });
    });
  });

  return { facetIndex, facetMap };
};
