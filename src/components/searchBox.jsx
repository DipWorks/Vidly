import React from "react";

// stateless functional component
const SearchBox = ({ value, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        name="query"
        //my-3 is margin of 3 on y-axis i.e. top and bottom
        className="form-control my-3"
        placeholder="Search..."
        autoFocus
        value={value}
        onChange={(e) => onSearch(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;
