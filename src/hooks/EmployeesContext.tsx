import {createContext, useEffect, useState} from "react";
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
		localStorage.setItem('employees', JSON.stringify([...employees, employee]));
	}

	const populateEmployees = () => {
		const mookarooEmployees = newEmployees as IEmployee[];
		const totalEmployees = [...employees, ...mookarooEmployees]
		setEmployees(totalEmployees);
		// add to local storage for persistence
		localStorage.setItem('employees', JSON.stringify(totalEmployees));
		return totalEmployees;
	}

	useEffect(() => {
		const localStorageEmployees = localStorage.getItem('employees');
		if (localStorageEmployees) {
			setEmployees(JSON.parse(localStorageEmployees));
		}
	}, []);

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

export { EmployeesProvider, EmployeesContext };