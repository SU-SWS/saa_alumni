const buildPager = (nbPages, maxLinks, activePage) => {
  const pagerLinks = [];

  // If nbPages is less or equal to maxlinks, just show pager links for all pages.
  if (nbPages <= maxLinks) {
    for (let i = 0; i < nbPages; i += 1) {
      pagerLinks.push(i);
    }
  } else {
    // Special handling if first page is active.
    if (activePage === 0) {
      for (let i = 0; i < maxLinks - 1; i += 1) {
        pagerLinks.push(i);
      }
      pagerLinks.push("...");
      pagerLinks.push(nbPages - 1);
    }
    // Special handling if last page is active.
    else if (activePage === nbPages - 1) {
      pagerLinks.push(0);
      pagerLinks.push("...");
      for (let i = nbPages - maxLinks + 1; i < nbPages; i += 1) {
        pagerLinks.push(i);
      }
    }
    // If the active page is any of the middle links.
    else {
      const nbMiddleLinks = maxLinks - 2;
      const nbLinksToLeft = Math.floor(nbMiddleLinks / 2);
      const nbLinksToRight = Math.ceil(nbMiddleLinks / 2);
      const middleLinksStart = activePage - nbLinksToLeft;
      const middleLinksEnd = activePage + nbLinksToRight;

      for (let i = 0; i < nbPages; i += 1) {
        if (
          i === 0 ||
          i === nbPages - 1 ||
          (i >= middleLinksStart && i <= middleLinksEnd)
        ) {
          pagerLinks.push(i);
        }
      }
      if (pagerLinks.indexOf(middleLinksEnd) < pagerLinks.length - 1) {
        pagerLinks.splice(pagerLinks.indexOf(middleLinksEnd) + 1, 0, "...");
      }

      if (middleLinksStart > 1) {
        pagerLinks.splice(pagerLinks.indexOf(middleLinksStart), 0, "...");
      }
    }
  }
  return pagerLinks;
};

export default buildPager;
