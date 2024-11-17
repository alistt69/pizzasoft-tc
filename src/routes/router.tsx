import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { paths } from "@/routes/routes.ts";
import RootLayout from "@/layouts/root";
import MainPage from "@/pages/main";
import EmployeePage from "@/pages/employee";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={paths.ROOT} element={<RootLayout/>}>
            <Route index element={<MainPage />} />
            <Route path={paths.ID} element={<EmployeePage />} />
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
