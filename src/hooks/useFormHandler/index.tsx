import { useNavigate } from "react-router-dom";
import React, { useCallback } from 'react';
import { paths } from "@/routes/routes.ts";
import { notification } from 'antd';
import { IEmployee } from "@/models";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";


const useFormHandler = (successCallback: (arg: IEmployee) => Promise<{ data: IEmployee; error?: undefined } | {
    data?: undefined;
    error: FetchBaseQueryError | SerializedError
}>) => {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const openNotification = useCallback((description: string) => {
        api['error']({
            message: 'FAILED TO SAVE',
            description: description,
            showProgress: true,
            pauseOnHover: true,
        });
    }, [api]);

    const handleSave = useCallback((formState: IEmployee, phoneInputRef: React.RefObject<HTMLInputElement>, birthdayInputRef: React.RefObject<HTMLInputElement>) => (e: React.FormEvent) => {
        e.preventDefault();
        const isPhoneComplete = phoneInputRef.current?.value.indexOf('_') === -1;
        const isBirthdayComplete = birthdayInputRef.current?.value.indexOf('_') === -1;

        const notify = (message: string) => {
            openNotification(message);
        };

        if (!isPhoneComplete) {
            notify('Please enter a complete phone number.');
            return;
        }

        if (!isBirthdayComplete) {
            notify('Please enter a complete birthday.');
            return;
        }

        const nameRegex = /^[\p{L}\s]+$/u;
        if (!nameRegex.test(formState.name)) {
            notify('Please enter a valid name containing only letters.');
            return;
        }

        const [day, month, year] = formState.birthday.split('.').map(Number);
        const currentYear = new Date().getFullYear();

        if (month < 1 || month > 12) {
            notify('Please enter a valid month (1-12).');
            return;
        }

        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
            notify(`Please enter a valid day (1-${daysInMonth}) for the month.`);
            return;
        }

        if (year > currentYear || year <= 999) {
            notify('Please enter a valid year (less than or equal to the current year and greater than 999).');
            return;
        }

        successCallback(formState)
            .then(() => {
                navigate(paths.ROOT)
            })
            .catch((error) => {
                notify(`An error occurred while saving: ${error}`);
            });
    }, [navigate, openNotification, successCallback]);

    return { handleSave, contextHolder };
};

export default useFormHandler;
