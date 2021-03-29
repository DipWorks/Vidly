import React, { Component } from "react";

// this componnet needs
//table columns: array
//sortColumn: object
//onSort : function
//It's a reusable compnonent that can be used for new tables
class TableHeader extends Component {
  // A method that cosists of logic to determine the sort order
  raiseSort = (path) => {
    //firt clone the sortcolumn object from the state
    const sortColumn = { ...this.props.sortColumn };
    //if the sortcolumn.path and path match then we just reverse the order
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    //otherwise simply set the path and order to asc
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    // now raise the event to update the state in the movies component
    this.props.onSort(sortColumn);
  };

  //this function determines the render icon
  renderSortIcon = (column) => {
    // using object destructuring to get sortColumn property
    const { sortColumn } = this.props;
    // if the column is not current column we do not wanna return any column
    if (column.path !== sortColumn.path) return null;

    // for ascending order
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    //otherwiese render a descing icon
    return <i className="fa fa-sort-desc"></i>;
  };

  // render method for TableHeader component
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            //   apply clickable class to show a hand pointer icon
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => {
                this.raiseSort(column.path);
              }}
            >
              {/* we wanna display the sort icon after the column name */}
              {/* renderSortIcon incapsulates the logic behind rendering the sort icon */}
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
