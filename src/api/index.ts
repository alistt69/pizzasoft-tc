import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEmployee } from "@/models";

const BASE_URL = "http://localhost:5001/employees";

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({

        getEmployees: builder.query<IEmployee[], undefined>({
            query: () => '/',
        }),

        getEmployeeById: builder.query<IEmployee, string>({
            query: (id) => `?id=${id}`,
            transformResponse: (response: IEmployee[]) => response[0]
        }),

        updateEmployee: builder.mutation<IEmployee, {id?: string}>({
            query: ({ id, ...patch }) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: patch,
            }),
        }),

        createEmployee: builder.mutation<IEmployee, Partial<IEmployee>>({
            query: (newEmployee) => ({
                url: '/',
                method: 'POST',
                body: newEmployee,
            }),
        }),
    }),
});

export const {
    useGetEmployeesQuery,
    useGetEmployeeByIdQuery,
    useUpdateEmployeeMutation,
    useCreateEmployeeMutation
} = employeeApi;
