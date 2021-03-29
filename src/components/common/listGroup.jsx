import React from "react";

// stateless functional component listgroup
// and using object destruturing to get props objects
const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem,
}) => {
  //return DOM element representing the component
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          // clickable class for hand pointer icon
          className={
            item === selectedItem
              ? "list-group-item clickable active"
              : "list-group-item clickable"
          }
        >
          <a
            href="/#"
            onClick={() => {
              onItemSelect(item);
            }}
          >
            {item[textProperty]}
          </a>
        </li>
      ))}
    </ul>
  );
};

//setting defualt props for the component so they can be used when the component is
//called by an object which does not have required props
// it reduces the number of props that need to be passed to the component
//which gives better control to the component
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
