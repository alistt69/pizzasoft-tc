import { useGetEmployeesQuery } from "@/api";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useEffect } from "react";
import FilterPanel from "@/pages/main/components/filter-panel";
import EmployeeTable from "@/pages/main/components/employee-table";


const MainPage = () => {
    const { data: employees = [], error, isLoading, refetch } = useGetEmployeesQuery(undefined);
    const roleFilter = useAppSelector((state: RootState) => state.filters.roleFilter);
    const archiveFilter = useAppSelector((state: RootState) => state.filters.archiveFilter);
    const sortField = useAppSelector((state: RootState) => state.filters.sortField);
    const sortOrder = useAppSelector((state: RootState) => state.filters.sortOrder);

    const parseDate = (dateString: string) => {
        const [day, month, year] = dateString.split('.').map(Number);
        return new Date(year, month - 1, day);
    };

    const filteredEmployees = employees
        .filter((employee) => (roleFilter ? employee.role === roleFilter : true))
        .filter((employee) => {
            if (archiveFilter === 'archived') return employee.isArchive;
            if (archiveFilter === 'non-archived') return !employee.isArchive;
            return true;
        })
        .sort((a, b) => {
            if (sortField === 'name') {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (sortField === 'birthday') {
                const dateA = parseDate(a.birthday);
                const dateB = parseDate(b.birthday);
                return sortOrder === 'asc'
                    ? dateA.getTime() - dateB.getTime()
                    : dateB.getTime() - dateA.getTime();
            }
            return 0;
        });

    useEffect(() => {
        refetch();
    }, [refetch, employees]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading employees</div>;

    return (
        <div style={{display: "flex", justifyItems: "center", flexDirection: "column"}}>
            <FilterPanel />
            <EmployeeTable employees={filteredEmployees} />
        </div>
    );
};

export default MainPage;