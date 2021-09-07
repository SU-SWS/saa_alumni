import React from "react";
import { buildPager, buildMobilePager } from "../../utilities/buildPager";

const SearchPager = ({ activePage, nbPages, maxLinks, selectPage }) => {
  if (activePage === undefined || nbPages === undefined) {
    return <div />;
  }

  const linkClasses = "su-text-digital-red-light hover:su-border-b-4";
  const activeLinkClasses =
    "su-text-cardinal-red su-border-b-4 su-cursor-default su-pointer-events-none";

  const desktopPagerLinks = buildPager(nbPages, maxLinks, activePage);
  const mobilePagerLinks = buildMobilePager(nbPages, activePage);

  const linkHandler = (e, page) => {
    e.preventDefault();
    selectPage(page);
  };

  const Pager = ({ pagerLinks, className }) => (
    <nav aria-label="Search results pagination" className={className}>
      <div className="su-flex su-rs-mt-6 su-rs-mb-7 su-justify-center md:su-space-x-36">
        <ul className="su-list-none su-flex su-space-x-10 md:su-space-x-15 su-p-0 su-font-serif su-text-[26px] su-font-bold">
          {activePage > 0 && (
            <li className="su-mb-0">
              <a
                className={`${linkClasses} su-text-20 su-no-underline su-font-regular su-self-center su-mr-9 md:su-mr-11`}
                href={`?page=${activePage - 1}`}
                onClick={(e) => linkHandler(e, activePage - 1)}
              >
                Previous
              </a>
            </li>
          )}
          {pagerLinks.map((i) => {
            if (i === "...") {
              return <li className="su-mb-0 su-px-9 md:su-px-11">...</li>;
            }
            return (
              <li className="su-mb-0" key={`search-pager-link-${i}`}>
                <a
                  className={`su-px-9 md:su-px-11 su-no-underline
                      ${activePage === i ? activeLinkClasses : linkClasses}
                    `}
                  href={`?page=${i}`}
                  onClick={(e) => linkHandler(e, i)}
                >
                  {i + 1}
                  {activePage === i && (
                    <span className="su-sr-only">, current page</span>
                  )}
                </a>
              </li>
            );
          })}

          {activePage < nbPages - 1 && (
            <li className="su-mb-0">
              <a
                className={`${linkClasses} su-text-20 su-no-underline su-font-regular su-self-center su-ml-9 md:su-ml-11`}
                href={`?page=${activePage + 1}`}
                onClick={(e) => linkHandler(e, activePage + 1)}
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );

  return (
    <div>
      <Pager className="su-hidden md:su-block" pagerLinks={desktopPagerLinks} />
      <Pager className="md:su-hidden" pagerLinks={mobilePagerLinks} />
    </div>
  );
};

export default SearchPager;
