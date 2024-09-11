import React from 'react';
import { dcnb } from 'cnbuilder';
// eslint-disable-next-line no-unused-vars
import { usePagination, UsePaginationProps } from 'react-instantsearch';

/**
 * @type {React.FC<UsePaginationProps>}
 * @returns {React.ReactElement}
 */
const SearchPager = (props) => {
  const {
    pages,
    currentRefinement,
    isFirstPage,
    isLastPage,
    canRefine,
    refine,
    createURL,
  } = usePagination(props);

  if (!canRefine) {
    return null;
  }

  const pageItemCommon =
    'su-flex su-items-center su-justify-center su-min-w-[3.2rem] md:su-min-w-[3.6rem] su-min-h-[3.2rem] md:su-min-h-[3.6rem] su-pb-4 su-text-black su-font-normal su-leading-none su-no-underline';
  const pageItemCommonHocus =
    'hocus:su-border-b-4 hocus:su-pb-0 hocus:su-border-digital-red hocus:su-text-digital-red hocus:su-no-underline';

  const directionCta = ({ isShown = false }) =>
    dcnb(
      'su-text-digital-red-light hover:su-border-b-4 su-text-20 su-no-underline su-font-regular su-self-center su-mr-9 md:su-mr-11',
      pageItemCommonHocus,
      {
        'su-invisible': !isShown,
        'su-visible': isShown,
      }
    );

  const pageCta = ({ isActive = false }) =>
    dcnb(pageItemCommon, pageItemCommonHocus, {
      'su-px-9 md:su-px-11 su-no-underline su-text-digital-red-light hover:su-border-b-4':
        !isActive,
      'su-px-9 md:su-px-11 su-no-underline su-text-cardinal-red su-border-b-4 su-cursor-default su-pointer-events-none':
        isActive,
    });

  return (
    <nav>
      <ul className="su-list-none su-flex su-space-x-10 md:su-space-x-15 su-p-0 su-font-serif su-font-bold">
        <li className="su-m-0">
          <a
            href={createURL(currentRefinement - 1)}
            onClick={(e) => {
              e.preventDefault();
              refine(currentRefinement - 1);
            }}
            aria-label="Previous page"
            className={directionCta({ isShown: !isFirstPage })}
          >
            Previous
          </a>
        </li>

        {pages.map((page) => (
          <li key={page} className="su-m-0">
            <a
              href={createURL(page)}
              onClick={(e) => {
                e.preventDefault();
                refine(page);
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

        <li className="su-m-0">
          <a
            href={createURL(currentRefinement + 1)}
            onClick={(e) => {
              e.preventDefault();
              refine(currentRefinement + 1);
            }}
            aria-label="Next page"
            className={directionCta({ isShown: !isLastPage })}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SearchPager;
