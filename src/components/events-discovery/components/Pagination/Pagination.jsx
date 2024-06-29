import React from 'react';
import { dcnb } from 'cnbuilder';
// eslint-disable-next-line no-unused-vars
import { usePagination, UsePaginationProps } from 'react-instantsearch';

/**
 * @type {React.FC<UsePaginationProps>}
 * @returns {React.ReactElement}
 */
export const Pagination = (props) => {
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
      'su-flex su-items-center su-justify-center su-min-w-[3.4rem] md:su-min-w-[4rem] su-min-h-[3.2rem] md:su-min-h-[3.6rem] su-leading-none su-text-black su-font-normal su-no-underline su-pb-4',
      pageItemCommonHocus,
      {
        'su-invisible': !isShown,
        'su-visible': isShown,
      }
    );

  const pageCta = ({ isActive = false }) =>
    dcnb(pageItemCommon, pageItemCommonHocus, {
      'su-pb-4': !isActive,
      'su-border-b-4 su-border-digital-red-dark su-pb-0 su-text-digital-red-dark su-font-semibold':
        isActive,
    });

  return (
    <nav>
      <ul className="su-flex su-items-center su-justify-center su-w-full su-p-0 su-list-none  su-gap-8 md:su-gap-12 lg:su-gap-16">
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
