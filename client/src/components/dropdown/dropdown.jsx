
import React from 'react';
import '../../styles/Dropdown.css'; 
const Dropdown = ({ options = [], onSelect }) => { 
  return (
    <select className="styled-dropdown" onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select an event</option>
      {options.map(option => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  );
};

export default Dropdown;
