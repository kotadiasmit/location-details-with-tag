import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeTag } from "../Store/reducer";
const TableBody = ({ locationDetails, selectedRows }) => {
  const dispatch = useDispatch();
  const { id, location, description, country, state, city, tag, checked } =
    locationDetails;
  const selectedRow = (event) => {
    const { checked } = event.target;
    selectedRows(id, checked);
  };
  const clearTag = () => {
    dispatch(removeTag(id));
  };
  return (
    <tr>
      <td>
        <input type="checkbox" onChange={selectedRow} checked={checked} />
      </td>
      <th scope="row">{id + 1}</th>
      <td className="row-text">{location}</td>
      <td>{description}</td>
      <td>{country}</td>
      <td>{state}</td>
      <td>{city}</td>
      <td>
        {tag}{" "}
        {tag && <AiOutlineClose className="close-btn" onClick={clearTag} />}
      </td>
    </tr>
  );
};
export default TableBody;
