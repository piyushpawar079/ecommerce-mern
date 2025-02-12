import React, { useState } from 'react';

const Filter = ({ title, options, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleCheckboxChange = (option) => {
    let updatedFilters;
    if (selectedFilters.includes(option)) {
      updatedFilters = selectedFilters.filter((item) => item !== option);
    } else {
      updatedFilters = [...selectedFilters, option];
    }
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters); // Notify parent component of the changes
  };

  return (
    <div className="border border-slate-300 rounded-md mt-5">
      <p className="mx-5 my-3">{title}</p>
      <div className="mx-5 my-3 gap-2 flex flex-col">
        {options.map((option) => (
          <div key={option} className="flex gap-3">
            <input
              type="checkbox"
              // checked={selectedFilters.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            <p className="text-sm text-slate-500">{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
