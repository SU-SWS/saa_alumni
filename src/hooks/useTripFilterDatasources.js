import { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

/**
 * Hook to fetch trip filter datasources
 */
export const useTripFilterDatasources = () => {
  const result = useStaticQuery(
    graphql`
      query tripFilters {
        filters: allStoryblokDatasourceEntry(
          filter: {
            data_source: {
              in: [
                "trip-region"
                "trip-experience"
                "trip-year"
                "trip-month"
                "trip-duration"
              ]
            }
          }
        ) {
          nodes {
            name
            value
            datasource: data_source
          }
        }
      }
    `
  );

  // Reduce datasources into id keyed arrays
  const datasources = useMemo(
    () =>
      result.filters.nodes.reduce(
        (agg, ds) => ({
          ...agg,
          [ds.datasource]: [...(agg[ds.datasource] || []), ds],
        }),
        {}
      ),
    [result.filters.nodes]
  );

  return datasources;
};
