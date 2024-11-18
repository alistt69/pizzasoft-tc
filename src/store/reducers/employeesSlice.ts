import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    roleFilter: string;
    isArchiveFilter: boolean;
}

const initialState: FilterState = {
    roleFilter: '',
    isArchiveFilter: false,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setRoleFilter(state, action: PayloadAction<string>) {
            state.roleFilter = action.payload;
        },
        setIsArchiveFilter(state, action: PayloadAction<boolean>) {
            state.isArchiveFilter = action.payload;
        },
        resetFilters(state) {
            state.roleFilter = '';
            state.isArchiveFilter = false;
        },
    },
});

export const { setRoleFilter, setIsArchiveFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;