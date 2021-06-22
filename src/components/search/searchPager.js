import React from 'react'

const SearchPager = ({activePage, nbPages, maxLinks, selectPage}) => {
  if (activePage === undefined || nbPages === undefined) {
    return <div></div>
  }

  const linkClasses = 'su-text-digital-red-light hover:su-border-b-4'
  const activeLinkClasses = 'su-text-black su-border-b-4 su-cursor-default su-pointer-events-none'

  let pagerLinks = []

  for (let i = 0; i < Math.min(maxLinks - 1, nbPages - 1); i++) {
    pagerLinks.push(i)
  }

  const linkHandler = (e, page) => {
    e.preventDefault()
    selectPage(page)
  }

  return (
    <div>
      <div className="su-flex su-mt-90 su-justify-center su-space-x-36">
        {activePage > 0 &&
          <a 
            className={`${linkClasses} hover:su-border-b-0 su-text-20 su-no-underline su-font-regular su-self-center`}
            href={`?page=${activePage - 1}`} 
            onClick={(e) => linkHandler(e, activePage -1)}
          >
              Previous
          </a>
        }
        <ul className="su-list-none su-flex su-space-x-15 su-p-0">
          {pagerLinks.map((i) => {
            return (
              <li className="su-mb-0" key={`search-pager-link-${i}`}>
                <a 
                  className={`su-text-24 su-font-bold su-px-11 su-no-underline
                    ${activePage === i ? activeLinkClasses : linkClasses}
                  `} 
                  href={`?page=${i}`}
                  onClick={(e) => linkHandler(e, i)}
                >
                  {i + 1}
                </a>
              </li>
            )
          })}
          {nbPages > maxLinks &&
            <li className="su-mb-0 su-font-bold">...</li>
          }
          <li>
            <a 
              className={`su-text-24 su-font-bold su-px-11  su-no-underline
                ${activePage === nbPages - 1 ? activeLinkClasses : linkClasses}
              `}
              href={`?page=${nbPages - 1}`}
              onClick={(e) => linkHandler(e, nbPages - 1)}
            >{nbPages}</a>
          </li>
        </ul>

        {activePage < nbPages - 1 &&
          <a 
            className={`${linkClasses} hover:su-border-b-0 su-text-20 su-no-underline su-font-regular su-self-center`} 
            href={`?page=${activePage + 1}`}
            onClick={(e) => linkHandler(e, activePage + 1)}
          >
              Next
            </a>
        }
      </div>
    </div>
  )
}

export default SearchPager