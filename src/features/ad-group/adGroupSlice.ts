import { createSlice } from '@reduxjs/toolkit';

const initialState: { budgetAndBidding: any; adFiles: any } = {
    budgetAndBidding: {},
    adFiles: {},
};

const adGroupSlice = createSlice({
    name: 'adGroup',
    initialState,
    reducers: {
        addBudgetAndBidding: (state, action) => {
            state.budgetAndBidding = action.payload;
        },
        addAdFiles: (state, action) => {
            state.adFiles = action.payload;
        },
    },
});

export default adGroupSlice.reducer;
export const { addBudgetAndBidding, addAdFiles } = adGroupSlice.actions;
