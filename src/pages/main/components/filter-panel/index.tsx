import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import {
    resetFilters,
    setArchiveFilter,
    setRoleFilter,
    setSortField,
    setSortOrder
} from "@/store/reducers/employeesSlice.ts";
import classes from "../../classes.module.scss"
import React from "react";


const FilterPanel = () => {
    const dispatch = useAppDispatch();
    const roleFilter = useAppSelector((state: RootState) => state.filters.roleFilter);
    const archiveFilter = useAppSelector((state: RootState) => state.filters.archiveFilter);
    const sortField = useAppSelector((state: RootState) => state.filters.sortField);
    const sortOrder = useAppSelector((state: RootState) => state.filters.sortOrder);

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setRoleFilter(event.target.value));
    };

    const handleArchiveChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setArchiveFilter(event.target.value as 'all' | 'archived' | 'non-archived'));
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, order] = event.target.value.split(':');
        dispatch(setSortField(field));
        dispatch(setSortOrder(order as 'asc' | 'desc'));
    };

    return (
        <div className={classes.filter_panel}>
            <div className={classes.form_container}>
                <select
                    id="role"
                    value={roleFilter}
                    onChange={handleRoleChange}
                    className={classes.form_field}>
                    <option value="">All</option>
                    <option value="cook">Cook</option>
                    <option value="waiter">Waiter</option>
                    <option value="driver">Driver</option>
                </select>
                <label htmlFor="role" className={classes.form_label}>Role</label>
            </div>

            <div className={classes.form_container}>
                <select
                    id="archive"
                    value={archiveFilter}
                    onChange={handleArchiveChange}
                    className={classes.form_field}>
                    <option value="all">All</option>
                    <option value="archived">Archived</option>
                    <option value="non-archived">Non-Archived</option>
                </select>
                <label htmlFor="archive" className={classes.form_label}>Archive Status</label>
            </div>

            <div className={classes.form_container}>
                <select
                    id="sort"
                    value={`${sortField}:${sortOrder}`}
                    onChange={handleSortChange}
                    className={classes.form_field}>
                    <option value=":asc">None</option>
                    <option value="name:asc">Name Ascending</option>
                    <option value="name:desc">Name Descending</option>
                    <option value="birthday:asc">Birthday Ascending</option>
                    <option value="birthday:desc">Birthday Descending</option>
                </select>
                <label htmlFor="sort" className={classes.form_label}>Sort By</label>
            </div>

            <button className={classes.reset_btn} onClick={() => dispatch(resetFilters())}>Reset filters</button>
        </div>
    );
};

export default FilterPanel;