import { Link, NavLink } from "react-router-dom";
import { paths } from "@/routes/routes.ts";
import React, { useEffect, useState } from "react";
import classes from "./classes.module.scss"

type Employee = {
    id: number;
    name: string;
    isArchive: boolean;
    role: string;
    phone: string;
    birthday: string;
};

const MainPage = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [roleFilter, setRoleFilter] = useState<string>('');
    const [isArchiveFilter, setIsArchiveFilter] = useState<boolean>(false);
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetch('/employees.json')
            .then((response) => response.json())
            .then((data) => setEmployees(data))
            .catch((error) => console.error('Error fetching employees:', error));
    }, []);

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRoleFilter(event.target.value);
    };

    const handleArchiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsArchiveFilter(event.target.checked);
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

    return(
        <div>
            main
            <NavLink to={paths.MAIN}>aaaa</NavLink>
            <div>
                <label>
                    Должность:
                    <select value={roleFilter} onChange={handleRoleChange}>
                        <option value="">Все</option>
                        <option value="cook">Повар</option>
                        <option value="waiter">Официант</option>
                        <option value="driver">Водитель</option>
                    </select>
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={isArchiveFilter}
                        onChange={handleArchiveChange}
                    />
                    В архиве
                </label>
                <button onClick={resetFilters}>Сбросить фильтры</button>
            </div>
            <div>
                <p>Активные фильтры:</p>
                <ul>
                    {roleFilter && <li>Должность: {roleFilter}</li>}
                    {isArchiveFilter && <li>В архиве</li>}
                    {sortField && <li>Сортировка: {sortField} ({sortOrder})</li>}
                </ul>
            </div>
            <table className={classes.table}>
                <thead className={classes.head}>
                <tr>
                    <th onClick={() => handleSort('name')}>Имя</th>
                    <th>Должность</th>
                    <th>Телефон</th>
                    <th onClick={() => handleSort('birthday')}>Дата рождения</th>
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
                            <td>{employee.role}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.birthday}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default MainPage;
