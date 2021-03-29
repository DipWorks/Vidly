import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  // we need to use two lodash methods in a chain
  // but to do that we gotta convert the given array to a lodash object first
  // which is done by _()
  // and finally we need to convert that lodash object to a regular array by chaining a
  //value() method
  // which is returned by this function
  return _(items).slice(startIndex).take(pageSize).value();
}
