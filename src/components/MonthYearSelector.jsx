import React, { useState, useRef, useEffect } from "react";
import { CgNametag } from "react-icons/cg";

const Dropdown = ({ options, value, onChange, isOpen, setIsOpen }) => {
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <div
        className="border rounded p-2 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {options[value]}
      </div>
      {isOpen && (
        <ul className="absolute mt-1 border bg-white rounded shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthYearSelector = ({ onChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  const years = Array.from({ length: 11 }, (_, i) => selectedYear - 10 + i);

  const handleMonthChange = (monthIndex) => {
    console.log("Month is: ", monthIndex + 1); // Adjust logging for readability
    setSelectedMonth(monthIndex);
    setYearDropdownOpen(false);
    onChange && onChange(monthIndex + 1, selectedYear); // Pass 1-based month
  };

  const handleYearChange = (yearIndex) => {
    const newYear = years[yearIndex];
    setSelectedYear(newYear);
    setMonthDropdownOpen(false);
    onChange && onChange(selectedMonth + 1, newYear); // Pass 1-based month
  };

  return (
    <div className="flex items-center space-x-4 mb-5">
      <Dropdown
        options={months}
        value={selectedMonth}
        onChange={handleMonthChange}
        isOpen={monthDropdownOpen}
        setIsOpen={(open) => {
          setMonthDropdownOpen(open);
          if (open) setYearDropdownOpen(false);
        }}
      />
      <Dropdown
        options={years}
        value={selectedYear - (selectedYear - 10)} // Adjust index for dropdown
        onChange={handleYearChange}
        isOpen={yearDropdownOpen}
        setIsOpen={(open) => {
          setYearDropdownOpen(open);
          if (open) setMonthDropdownOpen(false);
        }}
      />
    </div>
  );
};

export default MonthYearSelector;
