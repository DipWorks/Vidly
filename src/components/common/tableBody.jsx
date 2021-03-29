import React, { Component } from "react";
//importing lodash
// we are using lodash get method to render nested properties which cannot be
// rendered using normal bracket notation
import _ from "lodash";

// class component for table body
class TableBody extends Component {
  //a renderCell method determines what to render in td element below
  renderCell = (item, column) => {
    // if column has a content method then return the result of calling the content method
    if (column.content) return column.content(item);
    //if column does not have a content method then just return the reuslt of calling the
    //lodash get fucntion to load nested properties of item
    return _.get(item, column.path);
  };

  // this method creates the key for unique key property
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  // render method representing the component
  render() {
    // object destructuring to pick up data
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              //we are goint to call the renderCell method here
              // and call create key method to generate unique key
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
