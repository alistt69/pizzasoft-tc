import { NavLink, useNavigate, useParams } from "react-router-dom";
import { paths } from "@/routes/routes.ts";
import React, { useEffect, useState } from "react";

type Employee = {
    id: number;
    name: string;
    isArchive: boolean;
    role: string;
    phone: string;
    birthday: string;
};

const EmployeePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        fetch('/employees.json')
            .then((response) => response.json())
            .then((data) => {
                const foundEmployee = data.find((emp: Employee) => emp.id === Number(id));
                setEmployee(foundEmployee);
            })
            .catch((error) => console.error('Error fetching employee:', error));
    }, [id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (employee) {
            const { name, value } = event.target;
            setEmployee({ ...employee, [name]: value });
        }
    };

    const handleSave = () => {

        console.log('Сохраненные данные:', employee);
        navigate('/');
    };

    if (!employee) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <NavLink to={paths.ROOT}>back</NavLink>
            <h2>Детали сотрудника</h2>
            <div>
                <label>
                    Имя:
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
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
                        value={employee.role}
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
                        value={employee.phone}
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
                        value={employee.birthday}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <button onClick={handleSave}>Сохранить</button>
        </div>
    )
}

export default EmployeePage;
