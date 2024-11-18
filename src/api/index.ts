import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEmployee } from "@/models";


export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001' }),
    endpoints: (builder) => ({

        getEmployees: builder.query<IEmployee[], undefined>({
            query: () => '/employees',
        }),

        getEmployeeById: builder.query<IEmployee, number>({
            query: (id) => `/employees?id=${id}`,
            transformResponse: (response: IEmployee[]) => response[0]
        }),

        updateEmployee: builder.mutation<IEmployee, {id: number}>({
            query: ({ id, ...patch }) => ({
                url: `/employees/${id}`,
                method: 'PATCH',
                body: patch,
            }),
        }),

    }),
});

export const {
    useGetEmployeesQuery,
    useGetEmployeeByIdQuery,
    useUpdateEmployeeMutation,
} = employeeApi;
