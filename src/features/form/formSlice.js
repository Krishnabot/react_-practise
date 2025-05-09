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
        clearSubmissions: (state) => {
            state.submissions = [];
        },
    },
});
export const { submitForm , clearSubmissions} = formSlice.actions;
export default formSlice.reducer;