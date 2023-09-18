import {createContext, useContext, useState} from "react";

interface IEmployee {
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
	populateEmployees: (employees: IEmployee[]) => void,
}

const EmployeesContext = createContext({} as IEmployeesContext);

const EmployeesProvider = ({children}: any) => {
	const [employees, setEmployees] = useState<IEmployee[]>([]);

	const addEmployee = (employee: IEmployee) => {
		setEmployees([...employees, employee]);
	}

	const populateEmployees = (newEmployees: IEmployee[]) => {
		setEmployees([...employees, ...newEmployees]);
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