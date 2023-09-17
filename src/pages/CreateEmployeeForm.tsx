import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {GnarlyDatePicker} from "gnarly-date-picker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Header from "@/components/header.tsx";
import NavBar from "@/components/navbar.tsx";

export default function CreateEmployeeForm() {
	const formSchema = z.object({
		firstName: z.string().min(2).max(50),
		lastName: z.string().min(2).max(50),
		birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be a valid date"),
		startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be a valid date"),
		street: z.string().min(2).max(50),
		city: z.string().min(2).max(50),
		state: z.string().min(2).max(50),
		zip: z.number().min(5).max(6),
		department: z.string().min(2).max(50),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			birthDate: new Date(1990, 1, 1).toISOString().slice(0, 10),
			startDate: new Date().toISOString().slice(0, 10),
			street: "",
			city: "",
			state: "",
			zip: 0,
			department: "",
		}
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data)
	}

	return (
		<>
			<Header />
			<main className={"max-w-5xl mx-auto"}>
				<NavBar/>
				<section>
					<h2 className={"text-center text-4xl font-bold mb-4"}>Create employee</h2>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 p-4 lg:px-0 flex flex-col md:flex-row justify-between align-top">
							<div className={"w-full md:w-1/2"}>
								<h3 className={"font-bold text-2xl"}>Personal</h3>
								<FormField
									name={"firstName"}
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input placeholder="First Name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name={"lastName"}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input placeholder="Last Name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name={"birthDate"}
									render={( ) => (
										<FormItem>
											<FormLabel>Date of Birth</FormLabel>
											<FormControl className={"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"}>
												<GnarlyDatePicker
													inputClassName={"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 z-0"}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name={"startDate"}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Start Date</FormLabel>
											<FormControl>
												<GnarlyDatePicker
													{...field}
													defaultDate={new Date().toISOString().slice(0, 10)}
													inputClassName={"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 z-0"}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className={"border-y-2 md:border-y-0 md:border-x-2 border-gray-300 w-full md:w-1"}></div>
							<div className={"w-full md:w-1/2"}>
								<h3 className={"font-bold text-2xl"}>Address</h3>
								<FormField
									name={"street"}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Street</FormLabel>
											<FormControl>
												<Input placeholder="Street" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name={"city"}
									render={({ field }) => (
										<FormItem>
											<FormLabel>City</FormLabel>
											<FormControl>
												<Input placeholder="City" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="state"
									render={({ field }) => (
										<FormItem>
											<FormLabel>State</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a state" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="m@example.com">m@example.com</SelectItem>
													<SelectItem value="m@google.com">m@google.com</SelectItem>
													<SelectItem value="m@support.com">m@support.com</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name={"zip"}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Zip</FormLabel>
											<FormControl>
												<Input type="number" placeholder="Zip" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="department"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a verified email to display" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="m@example.com">m@example.com</SelectItem>
													<SelectItem value="m@google.com">m@google.com</SelectItem>
													<SelectItem value="m@support.com">m@support.com</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</form>
						<div className={"w-full text-center pt-2 pb-4"}>
							<Button type="submit">Submit</Button>
						</div>
					</Form>
				</section>
			</main>
		</>
	)
}

