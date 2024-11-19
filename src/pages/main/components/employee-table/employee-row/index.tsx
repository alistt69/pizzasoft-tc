import React from "react";
import { IEmployee } from "@/models";
import { Link } from "react-router-dom";


const EmployeeRow: React.FC<{ employee: IEmployee }> = ({ employee }) => {

    return (
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
    );
};

export default EmployeeRow;
