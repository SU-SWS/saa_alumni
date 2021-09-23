import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Container, Heading } from 'decanter-react';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import { useTripFilters } from '../../../hooks/useTripFilters';
import { TripFilterList } from '../../composite/TripFilterList/TripFilterList';
import TripCard from '../../cards/TripCard/TripCard';
import { Pagination } from '../../composite/Pagination/Pagination';
import { Chip } from '../../simple/Chip/Chip';
import * as styles from './TripFilterPage.styles';
import FaIcon from '../../simple/faIcon';

const TripFilterPage = (props) => {
  const { blok } = props;
  const { hero, aboveContent, belowContent } = blok;

  const {
    trips,
    filters,
    activeFilters,
    toggleFilter,
    clearFilterType,
    clearAllFilters,
    page,
    totalPages,
    getPageLink,
  } = useTripFilters();

  return (
    <SbEditable content={blok}>
      <Layout hasHero {...props}>
        <Container
          element="main"
          id="main-content"
          className={styles.page}
          width="full"
        >
          <header className="su-basefont-23">
            <CreateBloks blokSection={hero} />
          </header>
          {aboveContent && aboveContent.length > 0 && (
            <div className="trip-filter-page-above-content">
              <CreateBloks blokSection={aboveContent} />
            </div>
          )}
          <Container width="site">
            <div className={styles.filterSection}>
              <div className="trip-filters">
                <div className={styles.filterSidebar}>
                  <Heading level={2} className={styles.filterHeading}>
                    FILTER BY
                  </Heading>
                  <div className={styles.filtersList}>
                    {filters.map((filter) => (
                      <TripFilterList
                        key={filter.key}
                        filter={filter}
                        clearFilterType={clearFilterType}
                        toggleFilter={toggleFilter}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.filteredContent}>
                {activeFilters.length > 0 && (
                  <div className={styles.activeFilters}>
                    <div className={styles.filterChips}>
                      {activeFilters.map((filter) => (
                        <Chip
                          key={`chip:${filter.datasource}:${filter.value}`}
                          label={filter.name}
                          aria-label={`Clear ${filter.datasource}=${filter.name} filter`}
                          onClick={() =>
                            toggleFilter(filter.datasource, filter.value)
                          }
                        />
                      ))}
                    </div>
                    <div className={styles.clearAll}>
                      <button
                        className={styles.clearAllBtn}
                        type="button"
                        onClick={clearAllFilters}
                      >
                        <span className={styles.clearAllText}>
                          Clear all filters
                          <span aria-hidden className={styles.clearAllHover} />
                        </span>
                        <FaIcon
                          className={styles.clearAllIcon}
                          iconChoice="times"
                          isOutline
                        />
                      </button>
                    </div>
                  </div>
                )}
                <div
                  className={dcnb('filtered-trips-list', styles.trips)}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  tabIndex={0}
                >
                  {trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="pagination">
                    <Pagination
                      aria-label="Filtered trips pagination"
                      currentPage={page}
                      totalPages={totalPages}
                      pageLink={getPageLink}
                    />
                  </div>
                )}
              </div>
            </div>
          </Container>
          {belowContent && belowContent.length > 0 && (
            <div className="trip-filter-page-below-content">
              <CreateBloks blokSection={belowContent} />
            </div>
          )}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default TripFilterPage;
