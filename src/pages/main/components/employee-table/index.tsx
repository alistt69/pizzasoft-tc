import React from "react";
import { IEmployee } from "@/models";
import classes from "./classes.module.scss";
import EmployeeRow from "@/pages/main/components/employee-table/employee-row";


const EmployeeTable: React.FC<{ employees: IEmployee[]}> = ({ employees }) => {

    return (
        <table className={classes.table}>
            <thead className={classes.head}>
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Telephone</th>
                <th>Birthday</th>
            </tr>
            </thead>
            <tbody className={classes.body}>
            {employees.map((employee) => (
                <EmployeeRow key={employee.id} employee={employee} />
            ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;
