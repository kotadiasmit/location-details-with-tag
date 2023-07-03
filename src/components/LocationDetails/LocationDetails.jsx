import { useDispatch } from "react-redux";
import NavbarComp from "../Navbar/Navbar";
import "./LocationDetails.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown/Dropdown";

const countries = [
  {
    name: "United States",
    states: [
      {
        name: "California",
        districts: ["Los Angeles", "San Francisco", "San Diego"],
      },
      {
        name: "Texas",
        districts: ["Houston", "Austin", "Dallas"],
      },
    ],
  },
  {
    name: "India",
    states: [
      {
        name: "Maharashtra",
        districts: ["Mumbai", "Pune", "Nagpur"],
      },
      {
        name: "Karnataka",
        districts: ["Bangalore", "Mysore", "Hubli"],
      },
      {
        name: "Gujarat",
        districts: [
          "Ahmedabad",
          "Ghandhinagar",
          "Mehsana",
          "Jamnagar",
          "Surat",
          "Baroda",
        ],
      },
    ],
  },
];

const LocationDetails = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const navigate = useNavigate();

  const onLocationChanged = (event) => {
    const { value } = event.target;
    setLocation(value);
  };

  const onDescriptionChanged = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const onCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedDistrict("");
  };

  const onStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict("");
  };

  const onDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const filteredStates = countries.find(
    (country) => country.name === selectedCountry
  )?.states;

  const filteredDistricts = filteredStates?.find(
    (state) => state.name === selectedState
  )?.districts;

  const onClickSubmit = (event) => {
    event.preventDefault();
    const trimmedLocation = location.trim();
    const trimmedDescription = description.trim();
    let addLocationDetails = {
      id: 1,
      location: trimmedLocation,
      description: trimmedDescription,
    };
    // dispatch(submitUser(addNewUser));
    // dispatch(removeChats());
    setLocation("");
    setDescription("");
    navigate("/userChats");
  };

  return (
    <>
      <NavbarComp />
      <form className="form-container" onSubmit={onClickSubmit}>
        <div className="form-sub-container d-flex flex-column">
          <label className="label" htmlFor="Location">
            Location
          </label>
          <input
            className="input"
            type="text"
            id="Location"
            placeholder="Location"
            maxLength="10"
            value={location}
            onChange={onLocationChanged}
            autoFocus
          />
        </div>
        <div className="form-sub-container d-flex flex-column">
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            className="input"
            rows={3}
            maxLength="10"
            placeholder="Description"
            value={description}
            onChange={onDescriptionChanged}
            id="description"
          />
        </div>

        <Dropdown
          label="Country"
          options={countries.map((country) => country.name)}
          value={selectedCountry}
          onChange={onCountryChange}
        />
        {selectedCountry ? (
          <Dropdown
            label="State"
            options={filteredStates.map((state) => state.name)}
            value={selectedState}
            onChange={onStateChange}
          />
        ) : (
          <div className="form-sub-container">
            <label className="select-label" htmlFor="state">
              State:
            </label>
            <select className="select-ele" id="state" disabled>
              <option>State</option>
            </select>
          </div>
        )}
        {selectedState ? (
          <Dropdown
            label="District"
            options={filteredDistricts}
            value={selectedDistrict}
            onChange={onDistrictChange}
          />
        ) : (
          <div className="form-sub-container">
            <label className="select-label" htmlFor="district">
              District:
            </label>
            <select className="select-ele" id="district" disabled>
              <option>District</option>
            </select>
          </div>
        )}
        <button
          className="btn btn-primary mt-3"
          type="submit"
          disabled={
            !location ||
            !description ||
            !selectedCountry ||
            !selectedDistrict ||
            !selectedState
          }
        >
          Submit
        </button>
      </form>
    </>
  );
};
export default LocationDetails;
