import React from "react";

const HeaderTitle = ({ title, className }) => {
  return (
    <div className="headerTitle">
      <i className={`far fa-${className} edit-icon`}></i>
      <h4>{title}</h4>
    </div>
  );
};

export default HeaderTitle;
