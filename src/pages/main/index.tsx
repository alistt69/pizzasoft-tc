import { Link } from "react-router-dom";
import React, { useState } from "react";
import classes from "./classes.module.scss"
import { useGetEmployeesQuery } from "@/api";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { setIsArchiveFilter, setRoleFilter } from "@/store/reducers/employeesSlice.ts";
import { useDispatch } from "react-redux";


const MainPage = () => {
    const dispatch = useDispatch();
    const { data: employees = [], error, isLoading } = useGetEmployeesQuery(undefined);
    const roleFilter = useAppSelector((state: RootState) => state.filters.roleFilter)
    const isArchiveFilter = useAppSelector((state: RootState) => state.filters.isArchiveFilter)
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setRoleFilter(event.target.value));
    };

    const handleArchiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setIsArchiveFilter(event.target.checked));
    };

    const handleSort = (field: string) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const resetFilters = () => {
        setRoleFilter('');
        setIsArchiveFilter(false);
        setSortField('');
        setSortOrder('asc');
    };

    const parseDate = (dateString: string) => {
        const [day, month, year] = dateString.split('.').map(Number);
        return new Date(year, month - 1, day);
    };

    const filteredEmployees = employees
        .filter((employee) => (roleFilter ? employee.role === roleFilter : true))
        .filter((employee) => (isArchiveFilter ? employee.isArchive : true))
        .sort((a, b) => {
            if (sortField === 'name') {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (sortField === 'birthday') {
                const dateA = parseDate(a.birthday);
                const dateB = parseDate(b.birthday);
                return sortOrder === 'asc'
                    ? dateA.getTime() - dateB.getTime()
                    : dateB.getTime() - dateA.getTime();
            }
            return 0;
        });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading employees</div>;

    return (
        <div>
            main
            <div>
                <label>
                    Должность:
                    <select value={roleFilter} onChange={handleRoleChange}>
                        <option value="">All</option>
                        <option value="cook">Cook</option>
                        <option value="waiter">Waiter</option>
                        <option value="driver">Driver</option>
                    </select>
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={isArchiveFilter}
                        onChange={handleArchiveChange}
                    />
                    Is archived
                </label>
                <button onClick={resetFilters}>Reset filters</button>
            </div>
            <div>
                <p>Active filters:</p>
                <ul>
                    {roleFilter && <li>Role: {roleFilter}</li>}
                    {isArchiveFilter && <li>Is archived</li>}
                    {sortField && <li>sorted by: {sortField} ({sortOrder})</li>}
                </ul>
            </div>
            <table className={classes.table}>
                <thead className={classes.head}>
                <tr>
                    <th onClick={() => handleSort('name')}>Name</th>
                    <th>Role</th>
                    <th>Telephone</th>
                    <th onClick={() => handleSort('birthday')}>Birthday</th>
                </tr>
                </thead>
                <tbody className={classes.body}>
                {filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                        <td>
                            <Link to={employee.id.toString()}>
                                {employee.name}
                            </Link>
                        </td>
                        <td>
                            <Link to={employee.id.toString()}>
                                {employee.role}
                            </Link>
                        </td>
                        <td>
                            <Link to={employee.id.toString()}>
                                {employee.phone}
                            </Link>
                        </td>
                        <td>
                            <Link to={employee.id.toString()}>
                                {employee.birthday}
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default MainPage;
