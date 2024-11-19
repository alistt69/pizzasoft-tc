import { NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "@/api";
import { paths } from "@/routes/routes.ts";
import { IEmployee } from "@/models";


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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (formState) {
            const { name, value } = event.target;
            setFormState({ ...formState, [name]: value });
            console.log(formState)
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

    console.log(formState)

    return (
        <div>
            <NavLink to={paths.ROOT}>back</NavLink>
            <h2>Детали сотрудника</h2>
            <form>
            </form>
            <div>
                <label>
                    Имя:
                    <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Должность:
                    <input
                        type="text"
                        name="role"
                        value={formState.role}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Телефон:
                    <input
                        type="text"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Дата рождения:
                    <input
                        type="text"
                        name="birthday"
                        value={formState.birthday}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <button onClick={handleSave}>Сохранить</button>
        </div>
    );
}

export default EmployeePage;
