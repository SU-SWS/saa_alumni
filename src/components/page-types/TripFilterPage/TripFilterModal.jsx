import React, { useState, useRef, useEffect } from 'react';
import { dcnb } from 'cnbuilder';
import { Heading } from 'decanter-react';
import Modal from '../../layout/Modal/Modal';
import { drillDownFilterTypes } from '../../../utilities/filterTrips';
import { TripFilterList } from '../../composite/TripFilterList/TripFilterList';
import { Chip } from '../../simple/Chip/Chip';
import * as styles from './TripFilterModal.styles';
import FaIcon from '../../simple/faIcon';
import SAAButton from '../../simple/SAAButton';
import { focusElement } from '../../../utilities/dom';
import useEscape from '../../../hooks/useEscape';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { breakpoints } from '../../../contexts/GlobalContext';

const TripFilterModal = ({
  primaryFilter,
  filters,
  activeFilters,
  toggleFilter,
  clearFilterType,
  clearAllFilters,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModalBtnRef = useRef(null);

  // If closing modal wth close button or escape key, return focus to open modal button
  const handleClose = () => {
    setModalOpen(false);
    openModalBtnRef.current.focus();
  };

  useEscape(() => {
    if (modalOpen) {
      handleClose();
    }
  });

  // If the view results button is clicked, close the modal and focus on the results list
  const viewResults = () => {
    setModalOpen(false);
    // After the modal is closed, set a delay to make sure unlockscroll has changed body position from fixed to relative,
    // then focus and scroll to the filtered trips list
    setTimeout(() => {
      focusElement('.filtered-trips-list');
    }, 100);
  };

  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);

  // If modal is open on mobile breakpoint, and the window is resized desktop width, close the modal
  useEffect(() => {
    if (isDesktop) {
      setModalOpen(false);
    }
  }, [isDesktop]);

  return (
    <>
      <button
        type="button"
        className={styles.filterModalButton}
        aria-label="Open trips filtering modal"
        onClick={() => setModalOpen(true)}
        ref={openModalBtnRef}
      >
        <span>Filters</span>
        <FaIcon proFaIcon="sliders-h" className={styles.filterIcon} />
      </button>

      <Modal
        isOpen={modalOpen}
        onClose={handleClose}
        ariaLabel="Trips filtering modal"
        type="trip-filter"
      >
        <Heading
          level={2}
          size={1}
          weight="semibold"
          className={styles.modalHeading}
        >
          Filter by
        </Heading>
        <div className={dcnb('modal-body', styles.modalBody)}>
          {activeFilters && activeFilters.length > 0 && (
            <div className={styles.chipsWrapper}>
              {activeFilters.map((filter) => (
                <Chip
                  key={`chip:${filter.datasource}:${filter.value}`}
                  label={filter.name}
                  aria-label={`Clear ${filter.datasource}=${filter.name} filter`}
                  onClick={() => toggleFilter(filter.datasource, filter.value)}
                />
              ))}
            </div>
          )}
          <div>
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
        </div>
        <div className={dcnb('modal-footer', styles.footer)}>
          <button
            className={styles.clearAllBtn}
            type="button"
            onClick={clearAllFilters}
            aria-label="Clear all filters"
          >
            <span className={styles.clearAllText}>
              Clear all
              <span aria-hidden className={styles.clearAllHover} />
            </span>
            <FaIcon
              className={styles.clearAllIcon}
              iconChoice="times"
              isOutline
            />
          </button>
          <SAAButton
            size="small-short"
            buttonStyle="palo-verde-gradient"
            className={styles.viewResultsBtn}
            onClick={viewResults}
          >
            View results
          </SAAButton>
        </div>
      </Modal>
    </>
  );
};

export default TripFilterModal;
