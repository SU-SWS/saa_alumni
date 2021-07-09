import React from "react";
import buildPager from "../../utilities/buildPager";

const SearchPager = ({ activePage, nbPages, maxLinks, selectPage }) => {
  if (activePage === undefined || nbPages === undefined) {
    return <div />;
  }

  const linkClasses = "su-text-digital-red-light hover:su-border-b-4";
  const activeLinkClasses =
    "su-text-black su-border-b-4 su-cursor-default su-pointer-events-none";

  const pagerLinks = buildPager(nbPages, maxLinks, activePage);

  const linkHandler = (e, page) => {
    e.preventDefault();
    selectPage(page);
  };

  return (
    <div>
      <div className="su-flex su-mt-90 su-mb-90 su-justify-center su-space-x-32 md:su-space-x-36">
        {activePage > 0 && (
          <a
            className={`${linkClasses} hover:su-border-b-0 su-text-20 su-no-underline su-font-regular su-self-center`}
            href={`?page=${activePage - 1}`}
            onClick={(e) => linkHandler(e, activePage - 1)}
          >
            Previous
          </a>
        )}
        <ul className="su-list-none su-flex su-space-x-3 md:su-space-x-15 su-p-0">
          {pagerLinks.map((i) => {
            if (i === "...") {
              return <li>...</li>;
            }
            return (
              <li className="su-mb-0" key={`search-pager-link-${i}`}>
                <a
                  className={`su-text-24 su-font-bold su-px-5 md:su-px-11 su-no-underline
                      ${activePage === i ? activeLinkClasses : linkClasses}
                    `}
                  href={`?page=${i}`}
                  onClick={(e) => linkHandler(e, i)}
                >
                  {i + 1}
                </a>
              </li>
            );
          })}
        </ul>

        {activePage < nbPages - 1 && (
          <a
            className={`${linkClasses} hover:su-border-b-0 su-text-20 su-no-underline su-font-regular su-self-center`}
            href={`?page=${activePage + 1}`}
            onClick={(e) => linkHandler(e, activePage + 1)}
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
};

export default SearchPager;
