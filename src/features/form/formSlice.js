import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: "form",
    initialState: {
        submissions: [],
    },
    reducers: {
        submitForm: (state, action) => {
            state.submissions.push(action.payload);
        },
    },
});
export const { submitForm } = formSlice.actions;
export default formSlice.reducer;