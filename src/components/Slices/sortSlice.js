import { createSlice } from '@reduxjs/toolkit';

const sortSlice = createSlice({
    name: 'sort',
    initialState: {
        method: 'default'
    },
    reducers: {
        setSortMethod(state, action) {
            state.method = action.payload;
        }
    }
});

export const { setSortMethod } = sortSlice.actions;
export default sortSlice.reducer;