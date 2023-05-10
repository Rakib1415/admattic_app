import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addProfile: (state, action) => {
            state.profile = action.payload;
        },
    },
});

export default userSlice.reducer;
export const { addProfile } = userSlice.actions;
