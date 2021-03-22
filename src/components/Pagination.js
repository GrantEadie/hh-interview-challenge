import React, { useState } from "react";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

export default function Pagination(props) {
  const { colorsPerPage, totalColors, paginate } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalColors / colorsPerPage); i++) {
    pageNumbers.push(i);
  }

  const fetchPageNumbers = () => {
    const totalPages = Math.ceil(totalColors/colorsPerPage);
    const current = currentPage;
    const adjacent = 1;

    const totalNumbers = adjacent * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, current - adjacent);
      const endPage = Math.min(totalPages - 1, current + adjacent);
      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers();
  console.log(pages)

  const goToPage = page => {
    const currentPage = Math.max(0, Math.min(page, totalColors/colorsPerPage));
    setCurrentPage(currentPage)
  }

  const handleClick = page => {
    
    goToPage(page)
    paginate(page)
  }

  const handleMoveLeft = () => {
    
    goToPage(currentPage - 1);
  }

  const handleMoveRight = () => {
    
    goToPage(currentPage + 1)
  }

  return (
    <>
      <nav>
        <ul className="pagination">
          {pages.map((number, index) => {
            if (number === LEFT_PAGE)
              return (
                <li key={index} className="page-item">
                  <a
                    onClick={() => handleMoveLeft(number)}
                    href="!#"
                    className="page-link"
                  >
                    <span>&#8592;</span>
                  </a>
                </li>
              );
            if (number === RIGHT_PAGE)
              return (
                <li key={index} className="page-item">
                  <a
                    onClick={() => handleMoveRight(number)}
                    href="!#"
                    className="page-link"
                  >
                    <span>&#8594;</span>
                  </a>
                </li>
              );
            return (
              <li key={index} className="page-item">
                <a
                  onClick={() => handleClick(number)}
                  href="!#"
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            );
          })}
          {/* {pageNumbers.map((number, index) => (
            <li key={index} className="page-item">
              <a onClick={() => paginate(number)}
              href="!#"
              className="page-link">
                {number}
              </a>
            </li>
          ))} */}
        </ul>
      </nav>
    </>
  );
}
