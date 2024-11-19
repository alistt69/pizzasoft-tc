import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "@/api";
import { paths } from "@/routes/routes.ts";
import { IEmployee } from "@/models";
import classes from "./classes.module.scss";

const EmployeePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: employee, error, isLoading } = useGetEmployeeByIdQuery(Number(id));
    const [updateEmployee] = useUpdateEmployeeMutation();
    const [formState, setFormState] = useState<IEmployee>();

    useEffect(() => {
        if (employee) {
            setFormState(employee);
        }
    }, [employee]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (formState) {
            const { name, value } = event.target;
            setFormState({ ...formState, [name]: value });
            console.log(formState);
        }
    };

    const handleSave = async () => {
        if (formState) {
            await updateEmployee(formState);
            console.log('Сохраненные данные:', formState);
            navigate('/');
        }
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки сотрудника</div>;
    if (!formState) return null;

    return (
        <div>
            <NavLink to={paths.ROOT}>back</NavLink>
            <h2>Детали сотрудника</h2>
            <form>
                <div className={`${classes.form_container} ${classes.name}`}>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="name"
                        autoComplete="off"
                        className={classes.form_field}
                        value={formState.name}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="name" className={classes.form_label}>Employee Name</label>
                </div>

                <div className={classes.form_container}>
                    <select
                        id="role"
                        name="role"
                        value={formState.role}
                        onChange={handleInputChange}
                        className={classes.form_field}
                    >
                        <option value="">Choose The Role</option>
                        <option value="cook">Cook</option>
                        <option value="waiter">Waiter</option>
                        <option value="driver">Driver</option>
                    </select>
                    <label htmlFor="role" className={classes.form_label}>Role</label>
                </div>
            </form>
            <div>
                <label>
                    Телефон:
                    <InputMask
                        mask="+7 (999) 999-99-99"
                        value={formState.phone}
                        onChange={handleInputChange}
                        name="phone"
                    >
                        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => <input {...inputProps} type="text"/>}
                    </InputMask>
                </label>
            </div>
            <div>
                <label>
                    Дата рождения:
                    <InputMask
                        mask="99.99.9999"
                        value={formState.birthday}
                        onChange={handleInputChange}
                    >
                        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => <input {...inputProps} type="text" name="birthday" />}
                    </InputMask>
                </label>
            </div>
            <button onClick={handleSave}>Сохранить</button>
        </div>
    );
}

export default EmployeePage;