import { configureStore, createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name : 'form',
    initialState: {
        submissions: [],
    },
    reducers: {
        submitForm: (state, action) => {
            state.submissions.push(action.payload);
        },
    },
})

export const { submitForm } = formSlice.actions;
const store = configureStore({
    reducer: {
        form: formSlice.reducer,
    },
});
export default store;