import React from 'react'

const SearchPager = ({activePage, nbPages, maxLinks, selectPage}) => {
  if (activePage === undefined || nbPages === undefined) {
    return <div></div>
  }

  const linkClasses = 'su-text-digital-red-light su-no-underline hover:su-underline'
  const activeLinkClasses = 'su-text-black'

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
      <div className="su-flex su-space-x-36">
        {activePage > 0 &&
          <a 
            className={`${linkClasses} su-text-20 su-self-center`}
            href={`?page=${activePage - 1}`} 
            onClick={(e) => linkHandler(e, activePage -1)}
          >
              Previous
          </a>
        }
        <ul className="su-list-none su-flex su-space-x-16">
          {pagerLinks.map((i) => {
            return (
              <li className="su-mb-0">
                <a 
                  className={`su-text-24 su-font-bold
                    ${activePage == i ? activeLinkClasses : linkClasses}
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
            <li className="su-mb-0">...</li>
          }
          <li>
            <a 
              className={`su-text-24 su-font-bold
                ${activePage == nbPages - 1 ? activeLinkClasses : linkClasses}
              `}
              href={`?page=${nbPages - 1}`}
              onClick={(e) => linkHandler(e, nbPages - 1)}
            >{nbPages}</a>
          </li>
        </ul>

        {activePage < nbPages - 1 &&
          <a 
            className={`${linkClasses} su-text-20 su-self-center`} 
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