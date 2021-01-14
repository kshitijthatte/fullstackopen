import React from "react";

const Filter = ({ handleFiltering }) => {
  return (
    <div>
      filter shown with <input onChange={handleFiltering} />
    </div>
  );
};

export default Filter;
