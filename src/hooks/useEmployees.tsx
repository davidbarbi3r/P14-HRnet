import {useContext} from "react";
import {EmployeesContext} from "@/hooks/EmployeesContext.tsx";

const useEmployees = () => {
	return useContext(EmployeesContext);
};

export {useEmployees}