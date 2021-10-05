import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Container, Heading, Grid, GridCell, Skiplink } from 'decanter-react';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import { useTripFilters } from '../../../hooks/useTripFilters';
import { TripFilterList } from '../../composite/TripFilterList/TripFilterList';
import TripCard from '../../cards/TripCard/TripCard';
import { Pagination } from '../../composite/Pagination/Pagination';
import { Chip } from '../../simple/Chip/Chip';
import * as styles from './TripFilterPage.styles';
import FaIcon from '../../simple/faIcon';
import { drillDownFilterTypes } from '../../../utilities/filterTrips';
import Ankle from '../../partials/ankle/ankle';
import { HeroImage } from '../../composite/HeroImage/HeroImage';

const TripFilterPage = (props) => {
  const { blok } = props;
  const {
    title,
    intro,
    heroImage: { filename, alt, focus } = {},
    belowContent,
    ankleContent,
    primaryFilter,
  } = blok;

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
  } = useTripFilters(primaryFilter);

  return (
    <SbEditable content={blok}>
      <Layout isDark hasHero={filename} {...props}>
        <Container
          element="main"
          id="main-content"
          className={styles.page}
          width="full"
        >
          <header className="su-basefont-23">
            <HeroImage
              filename={filename}
              alt={alt}
              focus={focus}
              overlay={false}
              aspectRatio="5x2"
              className="su-aspect-w-5 su-aspect-h-2"
            />
            <Container className="su-rs-mt-6 su-rs-mb-8">
              <Heading
                level={1}
                font="serif"
                weight="bold"
                className="su-text-white su-text-m4 md:su-text-m6 xl:su-text-m7 2xl:su-text-m8 su-mx-auto su-text-center su-mb-02em"
              >
                {title}
              </Heading>
              <p className="su-text-white su-mx-auto su-text-center su-max-w-prose su-subheading su-leading-display">
                {intro}
              </p>
            </Container>
          </header>
          <Grid xs={12} gap className={styles.filterSection}>
            <GridCell xs={12} lg={3} className={styles.filterSidebar}>
              <Skiplink anchorLink="#filtered-trips-list">
                Skip pass filters to trip list
              </Skiplink>
              <Heading level={2} className={styles.filterHeading}>
                Filter by
              </Heading>
              <div className={styles.filtersList}>
                {filters
                  .filter(
                    ({ key }) =>
                      key !== primaryFilter.datasource ||
                      drillDownFilterTypes.includes(key)
                  )
                  .map((filter) => (
                    <TripFilterList
                      key={filter.key}
                      filter={filter}
                      clearFilterType={clearFilterType}
                      toggleFilter={toggleFilter}
                    />
                  ))}
              </div>
            </GridCell>
            <GridCell xs={12} lg={9} xxl={8}>
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
                <Grid
                  xs={1}
                  md={2}
                  gap
                  className={dcnb('filtered-trips-list', styles.trips)}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  tabIndex={0}
                >
                  <Heading level={2} srOnly id="filtered-trips-list">
                    List of trips
                  </Heading>
                  {trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </Grid>
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
            </GridCell>
          </Grid>
          {belowContent && belowContent.length > 0 && (
            <div className="trip-filter-page-below-content">
              <CreateBloks blokSection={belowContent} />
            </div>
          )}
          {ankleContent && ankleContent.length > 0 && (
            <Ankle isDark {...props} />
          )}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default TripFilterPage;
