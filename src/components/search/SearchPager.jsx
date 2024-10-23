import React from 'react';
import { dcnb } from 'cnbuilder';
import { usePagination } from 'react-instantsearch';
import scrollTo from 'gatsby-plugin-smoothscroll';
import useDisplay from '../../hooks/useDisplay';

/**
 * @type {React.FC<UsePaginationProps>}
 * @returns {React.ReactElement}
 */
const SearchPager = ({ maxDesktop = 6, maxMobile = 1 }) => {
  const { showMobile } = useDisplay();

  // Handle the "span" of the pagination.
  const maxDesktopSpan = Math.floor(maxDesktop / 2) || 1;
  const maxMobileSpan = Math.floor(maxMobile / 2) || 1;

  const {
    pages,
    currentRefinement,
    isFirstPage,
    isLastPage,
    canRefine,
    refine,
    createURL,
  } = usePagination({ padding: showMobile ? maxMobileSpan : maxDesktopSpan });

  if (!canRefine) {
    return null;
  }

  const pageItemCommon =
    'su-border-b-4 su-border-transparent su-flex su-items-center su-justify-center su-min-w-[3.2rem] md:su-min-w-[3.6rem] su-min-h-[3.2rem] md:su-min-h-[3.6rem] su-font-normal su-leading-none su-no-underline';
  const pageItemCommonHocus =
    'hocus:su-border-b-4 hocus:su-border-digital-red hocus:su-text-digital-red hocus:su-no-underline';

  const directionCta = ({ isShown = false }) =>
    dcnb(pageItemCommon, pageItemCommonHocus, 'su-text-22', {
      'su-invisible': !isShown,
      'su-visible': isShown,
    });

  const pageCta = ({ isActive = false }) =>
    dcnb(pageItemCommon, pageItemCommonHocus, {
      'su-px-9 md:su-px-11 su-text-digital-red-light': !isActive,
      'su-px-9 md:su-px-11 su-text-black su-border-b-black-20 su-cursor-default su-pointer-events-none':
        isActive,
    });

  /**
   * Handle scroll and focus.
   * */
  const scrollToResults = () => {
    document
      .getElementById('number-search-results')
      .focus({ preventScroll: true });
    scrollTo('#search-results');
  };

  return (
    <nav id="search-results-pager" aria-label="Search results pagination">
      <ul className="su-list-none su-flex su-rs-mt-6 su-rs-mb-7 su-justify-center su-space-x-10 md:su-space-x-15 su-p-0 su-font-serif su-text-26 su-font-bold">
        {!isFirstPage && (
          <li className="su-m-0">
            <a
              href={createURL(currentRefinement - 1)}
              onClick={(e) => {
                e.preventDefault();
                refine(currentRefinement - 1);
                scrollToResults();
              }}
              aria-label="Previous page"
              className={directionCta({ isShown: !isFirstPage })}
            >
              Previous
            </a>
          </li>
        )}

        {pages.map((page) => (
          <li key={page} className="su-m-0">
            <a
              href={createURL(page)}
              onClick={(e) => {
                e.preventDefault();
                refine(page);
                scrollToResults();
              }}
              aria-label={
                isLastPage ? `Last page, page ${page + 1}` : `Page ${page + 1}`
              }
              aria-current={currentRefinement === page ? 'page' : undefined}
              className={pageCta({ isActive: currentRefinement === page })}
            >
              {page + 1}
            </a>
          </li>
        ))}

        {!isLastPage && (
          <li className="su-m-0">
            <a
              href={createURL(currentRefinement + 1)}
              onClick={(e) => {
                e.preventDefault();
                refine(currentRefinement + 1);
                scrollToResults();
              }}
              aria-label="Next page"
              className={directionCta({ isShown: !isLastPage })}
            >
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SearchPager;
