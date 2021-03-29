import React from "react";

//stateless functional component
// and using object destruturing to get props objects
const Like = ({ liked, onLike }) => {
  // clickable class for hand pointer icon
  let classes = "fa clickable fa-heart";
  if (!liked) classes += "-o";
  return <i className={classes} aria-hidden="true" onClick={onLike}></i>;
};

export default Like;
