const Dropdown = ({ label, options, value, onChange }) => (
  <div className="form-sub-container">
    <label className="select-label" htmlFor={label}>
      {label}:{" "}
    </label>
    <select className="select-ele" value={value} onChange={onChange} id={label}>
      <option value="">{label}</option>
      {options.map((eachOption, id) => (
        <option key={id} value={eachOption}>
          {eachOption}
        </option>
      ))}
    </select>
  </div>
);
export default Dropdown;
