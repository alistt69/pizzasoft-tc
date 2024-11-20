import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { paths } from "@/routes/routes.ts";
import RootLayout from "@/layouts/root";
import ErrorPage from "@/pages/error";
import MainPage from "@/pages/main";
import EditEmployeePage from "@/pages/edit-employee";
import AddEmployeePage from "@/pages/add-employee";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={paths.ROOT} element={<RootLayout/>} errorElement={<ErrorPage />}>
            <Route index element={<MainPage />} />
            <Route path={paths.ID} element={<EditEmployeePage />} />
            <Route path={paths.ADD} element={<AddEmployeePage />} />
        </Route>
    ),
    {
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);
