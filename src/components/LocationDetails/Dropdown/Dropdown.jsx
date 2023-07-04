const Dropdown = ({ label, options, value, onChange }) => (
  <div className="sub-container">
    <label className="select-label" htmlFor={label}>
      {label}
    </label>
    <select
      aria-label={label}
      className="select-ele"
      value={value}
      onChange={onChange}
      id={label}
    >
      <option disabled value="">
        {label}
      </option>
      {options.map((eachOption, id) => (
        <option key={id} value={eachOption}>
          {eachOption}
        </option>
      ))}
    </select>
  </div>
);
export default Dropdown;
