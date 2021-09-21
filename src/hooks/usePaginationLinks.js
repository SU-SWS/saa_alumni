import { useMemo } from 'react';

export const usePaginationLinks = ({
  currentPage = 1,
  totalPages = 1,
  mobile = false,
  maxLinks = 5,
  // TODO: Handle offset startPage for 0 based indexing
}) => {
  const paginationLinks = useMemo(() => {
    if (mobile) {
      if (currentPage === totalPages) return [1, '...', totalPages];
      return [currentPage, '...', totalPages];
    }

    const links = [];
    const middleLinkCount = maxLinks - 2;
    let middleLinkStart = currentPage - Math.floor(middleLinkCount / 2);
    if (middleLinkStart < 2) {
      middleLinkStart = 2;
    } else if (middleLinkStart + middleLinkCount >= totalPages) {
      middleLinkStart = totalPages - middleLinkCount;
    }

    // First Page
    links.push(1);

    // Leading Ellipsis
    if (middleLinkStart > 2) links.push('...');

    // Middle Links
    for (let i = 0; i < middleLinkCount; i += 1) {
      const insertPage = middleLinkStart + i;
      if (insertPage > 1 && insertPage < totalPages) {
        links.push(insertPage);
      }
    }

    // Trailing Ellipsis
    const lastLink = links[links.length - 1];
    if (lastLink !== '...' && lastLink > 1 && lastLink < totalPages - 1) {
      links.push('...');
    }

    // Last Page
    if (totalPages > 1) links.push(totalPages);

    return links;
  }, [totalPages, currentPage, mobile, maxLinks]);

  return paginationLinks;
};
