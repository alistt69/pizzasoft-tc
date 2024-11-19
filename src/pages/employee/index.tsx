import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "@/api";
import { paths } from "@/routes/routes.ts";
import { IEmployee } from "@/models";
import classes from "./classes.module.scss";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";


const EmployeePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: employee, error, isLoading, refetch } = useGetEmployeeByIdQuery(Number(id));
    const [updateEmployee] = useUpdateEmployeeMutation();
    const [formState, setFormState] = useState<IEmployee>();
    const phoneInputRef = useRef<HTMLInputElement | null>(null);
    const birthdayInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        refetch();
        if (employee) {
            setFormState(employee);
        }
    }, [employee, refetch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (formState) {
            const { name, value } = event.target;
            setFormState({ ...formState, [name]: value });
        }
    };

    const handleCheckboxToggle = () => {
        if (formState) {
            setFormState({ ...formState, isArchive: !formState.isArchive });
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formState) {
            const isPhoneComplete = phoneInputRef.current?.value.indexOf('_') === -1;
            const isBirthdayComplete = birthdayInputRef.current?.value.indexOf('_') === -1;

            if (!isPhoneComplete) {
                alert('Please enter a complete phone number.');
                return;
            }

            if (!isBirthdayComplete) {
                alert('Please enter a complete birthday.');
                return;
            }

            await updateEmployee(formState);
            navigate('/');
        }
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки сотрудника</div>;
    if (!formState) return null;

    return (
        <div className={classes.employee_container}>
            <div className={classes.heading}>
                <h1>{formState.name} Details</h1>
                <NavLink to={paths.ROOT} className={classes.back_btn}>
                    <CloseOutlined/>
                </NavLink>
            </div>
            <form onSubmit={handleSave} className={classes.form}>
                <div className={`${classes.form_container} ${classes.name}`}>
                    <input type="text"
                           id="name"
                           name="name"
                           placeholder="name"
                           autoComplete="off"
                           className={classes.form_field}
                           value={formState.name}
                           onChange={handleInputChange}
                           required={true}
                    />
                    <label htmlFor="name" className={classes.form_label}>Employee Name</label>
                </div>

                <div className={`${classes.form_container} ${classes.role}`}>
                    <select
                        id="role"
                        name="role"
                        value={formState.role}
                        onChange={handleInputChange}
                        className={classes.form_field}
                        required={true}
                    >
                        <option value="">Choose The Role</option>
                        <option value="cook">Cook</option>
                        <option value="waiter">Waiter</option>
                        <option value="driver">Driver</option>
                    </select>
                    <label htmlFor="role" className={classes.form_label}>Role</label>
                </div>

                <div className={`${classes.form_container} ${classes.phone}`}>
                    <InputMask
                        mask="+7 (999) 999-9999"
                        value={formState.phone}
                        className={classes.form_field}
                        onChange={handleInputChange}
                        autoComplete="off"
                        id="phone"
                        name="phone"
                        required={true}
                    >
                        {(inputProps) => <input {...inputProps} ref={phoneInputRef} type="text"/>}
                    </InputMask>
                    <label htmlFor="phone" className={classes.form_label}>Phone</label>
                </div>

                <div className={`${classes.form_container} ${classes.birthday}`}>
                    <InputMask
                        mask="99.99.9999"
                        value={formState.birthday}
                        className={classes.form_field}
                        onChange={handleInputChange}
                        autoComplete="off"
                        id="birthday"
                        name="bithday"
                        required={true}
                    >
                        {(inputProps) => <input {...inputProps} ref={birthdayInputRef} type="text"
                                                name="birthday"/>}
                    </InputMask>
                    <label htmlFor="birthday" className={classes.form_label}>Birthday</label>
                </div>

                <div className={classes.checkbox_container} onClick={handleCheckboxToggle}>
                    <div className={`${classes.checkbox} ${formState.isArchive && classes.active}`}>
                        {formState.isArchive ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    </div>
                    <label className={classes.label}>Archived</label>
                </div>

                <button className={classes.save_btn} type="submit">Save</button>
            </form>
        </div>
    );
}

export default EmployeePage;