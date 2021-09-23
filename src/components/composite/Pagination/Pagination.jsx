import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { usePaginationLinks } from '../../../hooks/usePaginationLinks';
import { focusElement } from '../../../utilities/dom';
import * as styles from './Pagination.styles';

export const PaginationProps = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  pageLink: PropTypes.func.isRequired, // (page: number) => string;
  mobile: PropTypes.bool,
  maxLinks: PropTypes.number,
  'aria-label': PropTypes.string,
};

export const Pagination = ({
  currentPage,
  totalPages,
  mobile,
  maxLinks = 5,
  pageLink,
  'aria-label': ariaLabel,
}) => {
  const pageLinks = usePaginationLinks({
    currentPage,
    totalPages,
    maxLinks,
    mobile,
  });

  return (
    <nav aria-label={ariaLabel} className={styles.root}>
      <div className={styles.listWrapper}>
        <ul className={styles.pagesList}>
          {currentPage > 1 && (
            <li className={styles.pageItem()}>
              <Link
                className={styles.pageNavigationLink}
                to={pageLink(currentPage - 1)}
                onClick={() => focusElement('.filtered-trips-list')}
              >
                Previous
              </Link>
            </li>
          )}
          {pageLinks.map((page, idx) => (
            <li
              /* eslint-disable-next-line react/no-array-index-key */
              key={`pagination-${idx}-${page}`}
              className={styles.pageItem({ page })}
            >
              {page === '...' ? (
                '...'
              ) : (
                <Link
                  className={styles.pageLink({ active: page === currentPage })}
                  to={pageLink(page)}
                  onClick={() =>
                    page !== currentPage && focusElement('.filtered-trips-list')
                  }
                >
                  {page}
                  {currentPage === page && (
                    <span className="su-sr-only">, current page</span>
                  )}
                </Link>
              )}
            </li>
          ))}
          {currentPage < totalPages && (
            <li className={styles.pageItem()}>
              <Link
                className={styles.pageNavigationLink}
                to={pageLink(currentPage + 1)}
                onClick={() => focusElement('.filtered-trips-list')}
              >
                Next
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
Pagination.propTypes = PaginationProps;
