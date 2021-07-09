const buildPager = (nbPages, maxLinks, activePage) => {
  const pagerLinks = [];

  // If nbPages is less or equal to maxlinks, just show pager links for all pages.
  if (nbPages <= maxLinks) {
    for (let i = 0; i < nbPages; i += 1) {
      pagerLinks.push(i);
    }
  } else {
    // Special handling if first page is active.
    // eslint-disable-next-line no-lonely-if
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
    // Calculate link array for all other cases.
    else {
      const nbMiddleLinks = maxLinks - 2;

      // Case #1: 1 [2 _3_ 4 5] ... 9
      let middleLinksStart = 0;
      let middleLinksEnd = nbMiddleLinks;

      // Case #2: 1 ...[4 _5_ 6 7]... 9
      if (activePage >= nbMiddleLinks && activePage < nbPages - nbMiddleLinks) {
        const offset = Math.floor((nbMiddleLinks - 1) / 2);
        middleLinksStart = activePage - offset;
        middleLinksEnd = middleLinksStart + nbMiddleLinks - offset;
      }
      // Case #3: 1 ...[5 _6_ 7 8] 9
      else if (activePage >= nbPages - nbMiddleLinks) {
        middleLinksStart = nbPages - nbMiddleLinks;
        middleLinksEnd = nbPages - 1;
      }

      // Pack link of page numbers which will be included.
      for (let i = 0; i < nbPages; i += 1) {
        if (
          i === 0 ||
          i === nbPages - 1 ||
          (i >= middleLinksStart && i <= middleLinksEnd)
        ) {
          pagerLinks.push(i);
        }
      }

      // Splice in the first ellipsis if applicable.
      if (pagerLinks.indexOf(middleLinksEnd) < pagerLinks.length - 1) {
        pagerLinks.splice(pagerLinks.indexOf(middleLinksEnd) + 1, 0, "...");
      }
      // Splice in the second ellipsis if applicable.
      if (middleLinksStart > 1) {
        pagerLinks.splice(pagerLinks.indexOf(middleLinksStart), 0, "...");
      }
    }
  }
  return pagerLinks;
};

export default buildPager;
