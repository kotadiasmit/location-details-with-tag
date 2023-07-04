import { createSlice } from "@reduxjs/toolkit";

const locationReducer = createSlice({
  name: "location",
  initialState: {
    locationDetails: [
      {
        id: 0,
        location: "Sola road",
        description: "This is Sola",
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        tag: "",
        checked: false,
      },
      {
        id: 1,
        location: "Vadaj",
        description: "This is Vadaj",
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        tag: "",
        checked: false,
      },
      {
        id: 2,
        location: "Sector 5",
        description: "This is Ghandhinagar",
        country: "India",
        state: "Gujarat",
        city: "Ghandhinagar",
        tag: "",
        checked: false,
      },
    ],
  },
  reducers: {
    addNewLocation(state, action) {
      state.locationDetails.push(action.payload);
    },
    addTag(state, action) {
      console.log(action);
      const { selectedOption, selectedRowIds } = action.payload;
      selectedRowIds.forEach((id) => {
        console.log(id);
        state.locationDetails[id].tag = selectedOption;
      });
    },
    isRowChecked(state, action) {
      const { id, checked } = action.payload;
      console.log(checked, id);
      if (id !== undefined) {
        state.locationDetails[id].checked = checked;
      } else {
        state.locationDetails.map((location) => (location.checked = false));
      }
    },
    removeTag(state, action) {
      console.log(action);
      state.locationDetails[action.payload].tag = "";
    },
  },
});
export const { addNewLocation, addTag, isRowChecked, removeTag } =
  locationReducer.actions;
export default locationReducer.reducer;
