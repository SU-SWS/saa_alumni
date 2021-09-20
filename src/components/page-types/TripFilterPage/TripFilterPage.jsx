import React from 'react';
import SbEditable from 'storyblok-react';
import { Container } from 'decanter-react';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import { useTripFilters } from '../../../hooks/useTripFilters';

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
          className="trip-filter-page su-relative su-flex-grow su-w-full"
          width="full"
        >
          <header className="su-basefont-23">
            <CreateBloks blokSection={hero} />
          </header>
          <div className="above-content todo" />
          <div className="filter-content">
            <div className="filter-list">
              {Object.keys(filters).map((filterType) => (
                <div key={filterType}>
                  <h3>{filterType}</h3>
                  <div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={!filters[filterType].active}
                          onChange={() => clearFilterType(filterType)}
                        />
                        All
                      </label>
                    </div>
                    {filters[filterType].filters.map((filter) => (
                      <div key={`${filterType}:${filter.value}`}>
                        <label>
                          <input
                            type="checkbox"
                            checked={filter.selected}
                            onChange={() =>
                              toggleFilter(filterType, filter.value)
                            }
                          />
                          {filter.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="active-filters">
              <div className="filter-chips">
                {activeFilters.map((filter) => (
                  <button
                    key={`chip:${filter.datasource}:${filter.value}`}
                    type="button"
                    onClick={() =>
                      toggleFilter(filter.datasource, filter.value)
                    }
                  >
                    {filter.name} &times;
                  </button>
                ))}
              </div>
              <button type="button" onClick={clearAllFilters}>
                clear all
              </button>
            </div>
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
          <div className="below-content todo" />
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default TripFilterPage;
