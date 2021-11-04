import React, { useState, useRef } from 'react';
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

  const handleClose = () => {
    setModalOpen(false);
    openModalBtnRef.current.focus();
  };

  const viewResults = () => {
    setModalOpen(false);
    focusElement('.filtered-trips-list');
  };

  useEscape(() => {
    if (modalOpen) {
      handleClose();
    }
  });

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
            <div className={styles.filterChips}>
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
