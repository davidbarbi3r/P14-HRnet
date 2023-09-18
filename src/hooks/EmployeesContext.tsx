import {createContext, useContext, useState} from "react";
import newEmployees from "@/assets/employees.json";

export interface IEmployee {
	firstName: string,
	lastName: string,
	birthDate: string,
	startDate: string,
	street: string,
	city: string,
	state: string,
	zip: string,
	department: string,
}

export interface IEmployeesContext {
	employees: IEmployee[],
	addEmployee: (employee: IEmployee) => void,
	populateEmployees: () => IEmployee[],
}

const EmployeesContext = createContext({} as IEmployeesContext);

const EmployeesProvider = ({children}: any) => {
	const [employees, setEmployees] = useState<IEmployee[]>([]);

	const addEmployee = (employee: IEmployee) => {
		setEmployees([...employees, employee]);
	}

	const populateEmployees = () => {
		const mookarooEmployees = newEmployees as IEmployee[];
		const totalEmployees = [...employees, ...mookarooEmployees]
		setEmployees(totalEmployees);
		return totalEmployees;
	}

	const contextValue = {
		employees,
		addEmployee,
		populateEmployees,
	};

	return (
		<EmployeesContext.Provider value={contextValue}>
			{children}
		</EmployeesContext.Provider>
	)
}

const useEmployees = () => {
	const context = useContext(EmployeesContext);
	if (context === undefined) {
		throw new Error('useEmployees must be used within an EmployeesProvider');
	}
	return context;
};

export { EmployeesProvider, useEmployees };