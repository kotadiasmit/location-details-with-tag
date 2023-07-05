import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarComp from "../Navbar/Navbar";
import { Table } from "react-bootstrap";
import TableBody from "./TableBody";
import Creatable from "react-select/creatable";
import "./LocationPage.css";
import { addTag, isRowChecked } from "../Store/reducer";

const options = [
  { value: "select tag", label: "select tag" },
  { value: "office", label: "office" },
  { value: "home", label: "home" },
  { value: "other", label: "other" },
];

const LocationPage = () => {
  const dispatch = useDispatch();
  const locationDetailsArray = useSelector(
    (state) => state.locations.locationDetails
  );

  const [selectedOption, setSelectedOption] = useState("select tag");
  const sanitizedOptions = options.filter((o) => o?.value !== "select tag");

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const onSelectedOption = (opt, event) => {
    if (opt.__isNew__) {
      options.push({ value: opt.value, label: opt.label });
      setSelectedOption(opt.value);
    }
    const { outerText } = event.target;
    outerText && setSelectedOption(outerText);
  };

  const selectedRows = (id, checked) => {
    if (!checked) {
      const idIndex = selectedRowIds.indexOf(id);
      selectedRowIds.splice(idIndex, 1);
      setSelectedRowIds([...selectedRowIds]);
      dispatch(isRowChecked({ id, checked }));
    } else {
      selectedRowIds.push(id);
      setSelectedRowIds([...selectedRowIds]);
      dispatch(isRowChecked({ id, checked }));
    }
  };

  const noDataHeading =
    locationDetailsArray?.length === 0 ? "No Data Found." : "";

  useEffect(() => {
    if (selectedRowIds?.length && selectedOption !== "select tag") {
      dispatch(addTag({ selectedOption, selectedRowIds }));
      dispatch(isRowChecked(false));
      setSelectedOption("select tag");
      setSelectedRowIds([]);
    }
  }, [selectedOption]);

  return (
    <>
      <NavbarComp />
      <div className="table-responsive location-table-container pt-3 pb-4">
        <Table className="table" striped bordered hover>
          <thead>
            <tr>
              <th scope="col" className="col-checkbox-width"></th>
              <th scope="col" className="col-srno-width">
                Sr no
              </th>
              <th scope="col" className="col-location-width">
                Location
              </th>
              <th scope="col" className="col-description-width">
                Description
              </th>
              <th scope="col" className="col-country-width">
                Country
              </th>
              <th scope="col" className="col-state-width">
                State
              </th>
              <th scope="col" className="col-city-width">
                City
              </th>
              <th scope="col" className="col-tags-width">
                <Creatable
                  placeholder={"Tag"}
                  value={selectedOption}
                  options={sanitizedOptions}
                  onChange={(opt) => onSelectedOption(opt, event)}
                  classNamePrefix="react-select"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {locationDetailsArray.map((locationDetail) => (
              <TableBody
                key={locationDetail.id}
                locationDetails={locationDetail}
                selectedRows={selectedRows}
              />
            ))}
          </tbody>
        </Table>
        {noDataHeading && <h4 className="text-center mt-5">{noDataHeading}</h4>}
      </div>
    </>
  );
};
export default LocationPage;
