import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    roleFilter: string;
    archiveFilter: 'all' | 'archived' | 'non-archived';
    sortField: string;
    sortOrder: 'asc' | 'desc';
}

const initialState: FilterState = {
    roleFilter: '',
    archiveFilter: 'all',
    sortField: '',
    sortOrder: 'asc',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setRoleFilter(state, action: PayloadAction<string>) {
            state.roleFilter = action.payload;
        },
        setArchiveFilter(state, action: PayloadAction<'all' | 'archived' | 'non-archived'>) {
            state.archiveFilter = action.payload;
        },
        setSortField(state, action: PayloadAction<string>) {
            state.sortField = action.payload;
        },
        setSortOrder(state, action: PayloadAction<'asc' | 'desc'>) {
            state.sortOrder = action.payload;
        },
        resetFilters(state) {
            state.roleFilter = '';
            state.archiveFilter = 'all';
            state.sortField = '';
            state.sortOrder = 'asc';
        },
    },
});

export const { setRoleFilter, setArchiveFilter, setSortField, setSortOrder, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;