import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, Heading } from 'decanter-react';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import { useTripFilters } from '../../../hooks/useTripFilters';
import { TripFilterList } from '../../composite/TripFilterList/TripFilterList';
import { Chip } from '../../simple/Chip/Chip';
import * as styles from './TripFilterPage.styles';
import FaIcon from '../../simple/faIcon';

const TripFilterPage = (props) => {
  const { blok } = props;
  const { hero } = blok;

  const {
    trips,
    filters,
    activeFilters,
    toggleFilter,
    clearFilterType,
    clearAllFilters,
    page,
    setPage,
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
          <Container width="site">
            <div className="above-content todo" />
            <div className={styles.filterSection}>
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
                <div className="filtered-trips">
                  {trips.map((trip) => (
                    <div key={trip.id}>{trip.name}</div>
                  ))}
                </div>
                <div className="pagination">
                  <button onClick={() => setPage(page - 1)} type="button">
                    Previous
                  </button>
                  <button onClick={() => setPage(page + 1)} type="button">
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div className="below-content todo" />
          </Container>
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default TripFilterPage;
