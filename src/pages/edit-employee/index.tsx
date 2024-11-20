import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "@/api";
import { NavLink, useParams } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { paths } from "@/routes/routes.ts";
import useFormHandler from "@/hooks/useFormHandler";
import EmployeeForm from "@/components/employee-form";
import classes from "./classes.module.scss";
import { IEmployee } from "@/models";
import ErrorPage from "@/pages/error";


const EditEmployeePage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: employee, error, isLoading, refetch } = useGetEmployeeByIdQuery(id?.substring(2) || "");
    const [updateEmployee] = useUpdateEmployeeMutation();
    const [formState, setFormState] = useState<IEmployee>(employee || {
        name: '',
        role: '',
        phone: '',
        birthday: '',
        isArchive: false,
    });

    useEffect(() => {
        refetch();
        if (employee) setFormState(employee)
    }, [employee, refetch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleCheckboxToggle = () => {
        setFormState({ ...formState, isArchive: !formState.isArchive });
    };

    const { handleSave, contextHolder } = useFormHandler(updateEmployee);

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки сотрудника</div>;
    if (!employee) return <ErrorPage />;

    return (
        <>
            {contextHolder}
            <div className={classes.employee_container}>
                <div className={classes.heading}>
                    <h1>{formState.name.split(' ')[1]} {formState.name.split(' ')[0][0]}. Details</h1>
                    <NavLink to={paths.ROOT} className={classes.back_btn}>
                        <CloseOutlined/>
                    </NavLink>
                </div>
                <EmployeeForm
                    formState={formState}
                    handleInputChange={handleInputChange}
                    handleCheckboxToggle={handleCheckboxToggle}
                    handleSave={handleSave}
                />
            </div>
        </>
    );
}

export default EditEmployeePage;
