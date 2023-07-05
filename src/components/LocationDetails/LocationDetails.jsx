import { useDispatch, useSelector } from "react-redux";
import NavbarComp from "../Navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewLocation } from "../Store/reducer";
import Dropdown from "./Dropdown";
import "./LocationDetails.scss";

const countries = [
  {
    name: "United States",
    states: [
      {
        name: "California",
        districts: ["Los Angeles", "San Francisco", "San Diego"],
      },
      { name: "Texas", districts: ["Houston", "Austin", "Dallas"] },
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
  const dispatch = useDispatch();

  const onLocationChanged = (event) => {
    const { value } = event.target;
    setLocation(value);
  };

  const onDescriptionChanged = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const onCountryChange = (event) => {
    const { value } = event.target;
    setSelectedCountry(value);
    setSelectedState("");
    setSelectedDistrict("");
  };

  const onStateChange = (event) => {
    const { value } = event.target;
    setSelectedState(value);
    setSelectedDistrict("");
  };

  const onDistrictChange = (event) => {
    const { value } = event.target;
    setSelectedDistrict(value);
  };

  const filteredStates = countries.find(
    (country) => country.name === selectedCountry
  )?.states;

  const filteredDistricts = filteredStates?.find(
    (state) => state.name === selectedState
  )?.districts;

  const locationDetailsArray = useSelector(
    (state) => state.locations.locationDetails
  );

  const locationDetailsArrayLength = locationDetailsArray.length;

  const onClickSubmit = (event) => {
    event.preventDefault();
    const trimmedLocation = location.trim();
    const trimmedDescription = description.trim();
    let addLocationDetails = {
      id: locationDetailsArrayLength ? locationDetailsArrayLength : 0,
      location: trimmedLocation,
      description: trimmedDescription,
      country: selectedCountry,
      state: selectedState,
      city: selectedDistrict,
      tag: "",
    };
    dispatch(addNewLocation(addLocationDetails));
    setLocation("");
    setDescription("");
    navigate("/locationPage");
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
            maxLength="80"
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
        <Dropdown
          label="State"
          options={
            filteredStates ? filteredStates.map((state) => state.name) : null
          }
          value={selectedState}
          onChange={onStateChange}
          selectedCountryAndState={selectedCountry}
        />
        <Dropdown
          label="District"
          options={filteredDistricts}
          value={selectedDistrict}
          onChange={onDistrictChange}
          selectedCountryAndState={selectedState}
        />
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
