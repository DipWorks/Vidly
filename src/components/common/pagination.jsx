import React from "react";

//prop types used to come embedded with the earlier vesrsion of react
//now it is in different module and we need to install separately
import PropTypes from "prop-types";

//importing lodash
//lodash can be written instead of _. Furthermore, lodash is an optimized version
// of a popular javascript library underscore
import _ from "lodash";

// stateless functional component pagination
// and using object destruturing to get props objects
const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  //calculating pagesCount
  const pagesCount = Math.ceil(itemsCount / pageSize);

  //shows nothing when pagescount is 1
  if (pagesCount === 1) return null;

  //generating an array using the lodash library
  const pages = _.range(1, pagesCount + 1);

  //returns the dom element representing the component
  return (
    <nav className="page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a
              href="/#"
              onClick={() => onPageChange(page)}
              className="page-link"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//setting the proptypes and requirement fo props object with PropTypes
//a list of all the proptypes can be found under Advance Guides in reactjs.org
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
