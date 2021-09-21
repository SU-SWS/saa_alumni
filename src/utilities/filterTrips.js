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

/**
 * Helper function to generate array of month values between 2 dates
 */
export const getTripMonths = (startDate, endDate) => {
  const tripStartMonth = startDate.getMonth();
  const tripEndMonth = endDate.getMonth();
  const months = [];

  for (let i = 0; months[months.length - 1] !== tripEndMonth; i += 1) {
    months.push((tripStartMonth + i) % 12);
  }

  return months.map((monthIdx) => monthValues[monthIdx]);
};

/**
 * Helper function to get array of year values between 2 dates
 */
export const getTripYears = (startDate, endDate) => {
  const tripStartYear = startDate.getFullYear();
  const tripEndYear = endDate.getFullYear();
  const years = [];

  for (let i = 0; years[years.length - 1] !== tripEndYear; i += 1) {
    years.push(tripStartYear + i);
  }

  return years.map((year) => year.toString());
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
 * Returns true if trip matches any of the passed filters
 */
export const tripMatchesFilter = (trip, filters) => {
  const tripStartDate = new Date(trip.content.startDate);
  const tripEndDate = new Date(trip.content.endDate);
  const tripYears = getTripYears(tripStartDate, tripEndDate);
  const tripMonths = getTripMonths(tripStartDate, tripEndDate);
  const tripDurationDays = getTripDuration(tripStartDate, tripEndDate);

  const matchedFilter = filters.find((filter) => {
    switch (filter.datasource) {
      case 'trip-region':
        return trip.content.region === filter.value;
      case 'trip-experience':
        return (trip.content.experiences || []).includes(filter.value);
      case 'trip-year':
        return tripYears.includes(filter.value);
      case 'trip-month':
        return tripMonths.includes(filter.value);
      case 'trip-duration':
        return tripWithinDuration(tripDurationDays, filter.value);
      default:
        return false;
    }
  });
  return matchedFilter !== undefined;
};

/**
 * Trip sorting function
 */
const tripSorter = (a, b) => {
  // Handle Priority tag sorting first
  // NOTE: Reverse Priority order for sorting; higher idx = higher precedence
  const priorityTags = ["Staff's Pick", 'New'];
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

export const filtersListToKeyedObj = (filterList) =>
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
 * Get filtered list of Trips
 */
export const filterTrips = (allTrips, activeFilters = []) => {
  // Sort filters by filter type for AND filtering
  const filtersByType = filtersListToKeyedObj(activeFilters);

  const filteredTrips = allTrips.filter((trip) => {
    // Only include trip if it matches one filter from ALL filter types
    // NOTE: Short circuit filtering if we fail to match
    const hasFailingFilterType = Object.values(filtersByType).find(
      (typeFilters) => {
        const matchesFilter = tripMatchesFilter(
          trip,
          Object.values(typeFilters)
        );

        return !matchesFilter;
      }
    );

    return !hasFailingFilterType;
  });

  return filteredTrips.sort(tripSorter);
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

// Given a trip, determine the filters that it matches
export const getTripFilterValues = (trip, allFilters) => {
  const startDate = new Date(trip.content.startDate);
  const endDate = new Date(trip.content.endDate);

  const { region, experiences } = trip.content;
  const year = getTripYears(startDate, endDate);
  const month = getTripMonths(startDate, endDate);
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
 * Builds trip filter index for faster, more performant access to filters-by-trip
 */
export const buildFilterIndex = (allTrips, allFilters) => {
  // Map filters by type/value
  const filterMap = Object.keys(allFilters).reduce(
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
  const filterIndex = {};

  allTrips.forEach((trip) => {
    // map trip by id
    filterIndex[trip.id] = [];

    // Get Filters associated with trip
    const filters = getTripFilterValues(trip, allFilters);

    Object.keys(filters).forEach((filterType) => {
      filters[filterType].forEach((filterValue) => {
        // Index filters by tripId
        const filter = filterMap?.[filterType]?.[filterValue];
        if (filter) {
          filterIndex[trip.id].push(filter);
        }
      });
    });
  });

  return { filterIndex, filterMap };
};

/**
 * Returns [datasource][value] keyed nested object of all tags for trips in list
 */
export const getFiltersForTrips = (filteredTrips, filterIndex) => {
  const filtersByType = filteredTrips.reduce((agg, trip) => {
    const updatedAgg = agg;
    filterIndex[trip.id].forEach((filter) => {
      updatedAgg[filter.datasource] = {
        ...(agg?.[filter.datasource] || {}),
        [filter.value]: {
          ...(agg?.[filter.datasource]?.[filter.value] || {}),
          [trip.id]: trip,
        },
      };
    });
    return updatedAgg;
  }, {});

  return filtersByType;
};
