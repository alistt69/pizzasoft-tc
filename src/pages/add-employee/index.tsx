import { useCreateEmployeeMutation } from "@/api";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { paths } from "@/routes/routes.ts";
import useFormHandler from "@/hooks/useFormHandler";
import EmployeeForm from "@/components/employee-form";
import classes from "./classes.module.scss";
import { IEmployee } from "@/models";


const AddEmployeePage = () => {
    const navigate = useNavigate();
    const [createEmployee] = useCreateEmployeeMutation();
    const [formState, setFormState] = useState<IEmployee>({
        name: '',
        role: '',
        phone: '',
        birthday: '',
        isArchive: false,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleCheckboxToggle = () => {
        setFormState({ ...formState, isArchive: !formState.isArchive });
    };

    const { handleSave, contextHolder } = useFormHandler(createEmployee);

    return (
        <div className={classes.employee_container}>
            {contextHolder}
            <div className={classes.heading}>
                <h1>Add New Employee</h1>
                <button onClick={() => navigate(paths.ROOT)} className={classes.back_btn}>
                    <CloseOutlined/>
                </button>
            </div>
            <EmployeeForm
                formState={formState}
                handleInputChange={handleInputChange}
                handleCheckboxToggle={handleCheckboxToggle}
                handleSave={handleSave}
            />
        </div>
    );
};

export default AddEmployeePage;
