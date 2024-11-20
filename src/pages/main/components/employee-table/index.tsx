import EmployeeRow from "@/pages/main/components/employee-table/employee-row";
import { IEmployee } from "@/models";
import React from "react";
import classes from "./classes.module.scss";


const EmployeeTable: React.FC<{ employees: IEmployee[]}> = ({ employees }) => {

    return (
        <div className={classes.table_wrap}>
            <div style={{overflow: "scroll", maxHeight: "600px", width: "100%"}}>
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
                        <EmployeeRow key={employee.id} employee={employee}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
