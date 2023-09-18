import {GnarlyDatePicker} from "gnarly-date-picker";
import Header from "@/components/header.tsx";
import NavBar from "@/components/navbar.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {FormItem} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {SelectValue} from "@radix-ui/react-select";
import {z} from "zod";
import {useEmployees} from "@/hooks/EmployeesContext.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"

export default function CreateEmployeeForm() {

	// make a zod schema for the employee
	const employeeSchema = z.object({
		firstName: z.string().min(2).max(100),
		lastName: z.string().min(2).max(100),
		birthDate:
			z.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/)
			.refine((value) => {
				const birthdate = new Date(value);

				const currentDate = new Date();
				const age = currentDate.getFullYear() - birthdate.getFullYear();

				return age >= 16 && age <= 120;
			}, { message: "Age must be between 16 and 120" }),
		startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
		street: z.string().min(1).max(255),
		city: z.string().min(1).max(255),
		state: z.string().min(1).max(255),
		zip: z.string().min(1).max(255),
		department: z.string().min(1).max(255),
	})

	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		birthDate: "",
		startDate: "",
		street: "",
		city: "",
		state: "",
		zip: "",
		department: "",
	});

	const [birthDate, setBirthDate] = useState("1990-01-01")
	const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10))

	const [employeeForm, setEmployeeForm] = useState({
		firstName: "",
		lastName: "",
		birthDate,
		startDate,
		street: "",
		city: "",
		state: "",
		zip: "30000",
		department: "",
	})
	const { addEmployee } = useEmployees()
	const [dialogOpen, setDialogOpen] = useState(false)

	const onSubmit = (e) => {
		e.preventDefault()
		const formData = {
			...employeeForm,
			birthDate,
			startDate
		}

		// validate the form data
		try {
			employeeSchema.parse(formData)

			setErrors({
				firstName: "",
				lastName: "",
				birthDate: "",
				startDate: "",
				street: "",
				city: "",
				state: "",
				zip: "",
				department: "",
			});

			addEmployee(formData)
			setDialogOpen(true)
		} catch (e) {
			if (e instanceof z.ZodError) {
				const fieldErrors = errors
				e.errors.forEach((validationError) => {
					// Set error messages for the corresponding fields
					fieldErrors[validationError.path[0]] = validationError.message;
				});
				setErrors(prevState => ({
					...prevState,
					...fieldErrors
				}));
			}
		}
	}
	const departmentOptions = [
		"Sales",
		"Marketing",
		"Engineering",
		"Human Resources",
		"Legal"
	]

	return (
		<>
			<Header />
			<main className={"max-w-5xl mx-auto"}>
				<NavBar/>
				<Dialog open={dialogOpen}>
					<DialogContent onClick={e => setDialogOpen(!e)}>
						<DialogHeader>
							<DialogTitle>Congratulations</DialogTitle>
							<DialogDescription>
								You have successfully created an employee
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
				<section>
					<h2 className={"text-center text-4xl font-bold mb-4"}>Create employee</h2>
						<form onSubmit={onSubmit}>
							<div className={"gap-4 p-4 lg:px-0 flex flex-col md:flex-row justify-between align-top"}>
								<div className={"w-full md:w-1/2"}>
									<h3 className={"font-bold text-2xl"}>Personal</h3>
									<FormItem className={"mt-4"}>
										<Label htmlFor="firstName" className={"block"}>First Name</Label>
										<Input type="text" placeholder="First Name" name={"firstName"} onChange={e => {
											try {
												z.string().min(2).max(100).parse(e.target.value)
												setErrors({
													...errors,
													firstName: ""
												})
												setEmployeeForm({
													...employeeForm,
													firstName: e.target.value
												})
											} catch (e) {
												if (e instanceof z.ZodError) {
													setErrors({
														...errors,
														firstName: e.errors[0].message
													})
												}
											}
										}}
										className={`${errors.firstName ? "border-red-600" : ""} lex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
										/>
										{errors.firstName && (
											<p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
										)}
									</FormItem>
									<FormItem className={"mt-4"}>
										<Label htmlFor="lastName" className={"block"}>Last Name</Label>
										<Input type="text" placeholder="Last Name" name={"lastName"} onChange={e => {
											try {
												z.string().min(2).max(100).parse(e.target.value)
												setErrors({
													...errors,
													lastName: ""
												})
												setEmployeeForm({
													...employeeForm,
													lastName: e.target.value
												})
											} catch (e) {
												if (e instanceof z.ZodError) {
													setErrors({
														...errors,
														lastName: e.errors[0].message
													})
												}
											}
										}}
										className={"lex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"}
										/>
										{errors.lastName && (
											<p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
										)}
									</FormItem>
									<FormItem className={"mt-4"}>
										<Label htmlFor="birthDate" className={"block"}>Date of Birth</Label>
										<GnarlyDatePicker
											name={"birthDate"}
											date={birthDate} setDate={setBirthDate}
											inputClassName={"lex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"}
										/>
										{errors.birthDate && (
											<p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
										)}
									</FormItem>
									<FormItem className={"mt-4"}>
										<Label htmlFor="startDate" className={"block"}>Date of Start</Label>
										<GnarlyDatePicker
											name={"startDate"}
											date={startDate} setDate={setStartDate}
											inputClassName={"lex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"}
										/>
										{errors.startDate && (
											<p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
										)}
									</FormItem>
								</div>
								<div className={"border-y-2 md:border-y-0 md:border-x-2 border-gray-300 w-full md:w-1"}></div>
								<div className={"w-full md:w-1/2"}>
									<h3 className={"font-bold text-2xl"}>Address</h3>
									<FormItem className={"mt-4"}>
										<Label htmlFor="street" className={"block"}>Street</Label>
										<Input type="text" placeholder="Street" name={"street"} onChange={e => {
											try {
												z.string().min(1).max(255).parse(e.target.value)
												setErrors({
													...errors,
													street: ""
												})
												setEmployeeForm({
													...employeeForm,
													street: e.target.value
												})
											} catch (e) {
												if (e instanceof z.ZodError) {
													setErrors({
														...errors,
														street: e.errors[0].message
													})
												}
											}
										}}/>
										{errors.street && (
											<p className="text-red-500 text-xs mt-1">{errors.street}</p>
										)}
									</FormItem>
									<FormItem className={"mt-4"}>
										<Label htmlFor="city" className={"block"}>City</Label>
										<Input type="text" placeholder="City" name={"city"} onChange={e => {
											try {
												z.string().min(1).max(255).parse(e.target.value)
												setErrors({
													...errors,
													city: ""
												})
												setEmployeeForm({
													...employeeForm,
													city: e.target.value
												})
											} catch (e) {
												if (e instanceof z.ZodError) {
													setErrors({
														...errors,
														city: e.errors[0].message
													})
												}
											}
										}} />
										{errors.city && (
											<p className="text-red-500 text-xs mt-1">{errors.city}</p>
										)}
									</FormItem>
									<FormItem className={"mt-4"}>
										<Label htmlFor="state" className={"block"}>State</Label>
										<Select name={"state"} onValueChange={e => {
											try {
												z.string().min(1).max(255).parse(e)
												setErrors({
													...errors,
													state: ""
												})
												setEmployeeForm({
													...employeeForm,
													state: e
												})
											} catch (e) {
												if (e instanceof z.ZodError) {
													setErrors({
														...errors,
														state: e.errors[0].message
													})
												}
											}
										}}>
											<SelectTrigger>
												<SelectValue placeholder="Select a State" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="AL">Alabama</SelectItem>
												<SelectItem value="AK">Alaska</SelectItem>
												<SelectItem value="AZ">Arizona</SelectItem>
											</SelectContent>
										</Select>
										{errors.state && (
											<p className="text-red-500 text-xs mt-1">{errors.state}</p>
										)}
									</FormItem>
									<FormItem className={"mt-4"}>
										<Label htmlFor="zip" className={"block"}>Zip</Label>
										<Input type="text" placeholder="Zip" name={"zip"} onChange={e => {
											try {
												z.string().min(5).max(6).parse(e.target.value)
												setErrors({
													...errors,
													zip: ""
												})
												setEmployeeForm({
													...employeeForm,
													zip: e.target.value
												})
											} catch (e) {
												if (e instanceof z.ZodError) {
													setErrors({
														...errors,
														zip: e.errors[0].message
													})
												}
											}
										}} />
										{errors.zip && (
											<p className="text-red-500 text-xs mt-1">{errors.zip}</p>
										)}
									</FormItem>
									<FormItem className={"mt-4"}>
										<Label htmlFor="department" className={"block"}>Department</Label>
										<Select name={"department"} onValueChange={e => {
											try {
												z.string().min(1).max(255).parse(e)
												setErrors({
													...errors,
													department: ""
												})
												setEmployeeForm({
													...employeeForm,
													department: e
												})
											} catch (e) {
												if (e instanceof z.ZodError) {
													setErrors({
														...errors,
														department: e.errors[0].message
													})
												}
											}
										}}>
											<SelectTrigger>
												<SelectValue placeholder="Select a Department" />
											</SelectTrigger>
											<SelectContent>
												{departmentOptions.map((option) => (
													<SelectItem key={option} value={option}>
														{option}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{errors.department && (
											<p className="text-red-500 text-xs mt-1">{errors.department}</p>
										)}
									</FormItem>
								</div>
							</div>
							<Button type="submit">Submit</Button>
						</form>
						<div className={"w-full text-center pt-2 pb-4"}>
						</div>
{/*
					</Form>
*/}
				</section>
				{/*<form onSubmit={(e) => {
					e.preventDefault()
					// console log the form data
					const formData = new FormData(e.currentTarget)
					for (const entry of formData.entries()) {
						console.log(entry[0], entry[1]);
					}
					console.log(JSON.stringify(formData))
				}}>
					<GnarlyDatePicker/>
					<button type={"submit"}>Submit</button>
				</form>*/}
			</main>
		</>
	)
}

