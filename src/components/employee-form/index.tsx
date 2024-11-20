import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { IEmployee } from "@/models";
import InputMask from "react-input-mask";
import React, { useRef } from "react";
import classes from "./classes.module.scss"

interface EmployeeFormProps {
    formState: IEmployee;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleCheckboxToggle: () => void;
    handleSave: (formState: IEmployee, phoneInputRef: React.RefObject<HTMLInputElement>, birthdayInputRef: React.RefObject<HTMLInputElement>) => (event: React.FormEvent<HTMLFormElement>) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ formState, handleInputChange, handleCheckboxToggle, handleSave }) => {
    const phoneInputRef = useRef<HTMLInputElement | null>(null);
    const birthdayInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <form onSubmit={handleSave(formState, phoneInputRef, birthdayInputRef)} className={classes.form}>
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
                <label htmlFor="name" className={classes.form_label}>Name & Surname</label>
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
                    name="birthday"
                    required={true}
                >
                    {(inputProps) => <input {...inputProps} ref={birthdayInputRef} type="text"/>}
                </InputMask>
                <label htmlFor="birthday" className={classes.form_label}>Birthday</label>
            </div>

            <div className={classes.checkbox_container} onClick={handleCheckboxToggle}>
                <div className={`${classes.checkbox} ${formState.isArchive && classes.active}`}>
                    {formState.isArchive ? <CheckCircleOutlined/> : <CloseCircleOutlined/>}
                </div>
                <div className={classes.label}>Archived</div>
            </div>

            <button className={classes.save_btn} type="submit">Save</button>
        </form>
    );
};

export default EmployeeForm;
