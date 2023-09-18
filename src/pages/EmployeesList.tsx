import Header from "@/components/header.tsx";
import NavBar from "@/components/navbar.tsx";

function EmployeesList() {
	return (
		<>
			<Header/>
			<main className={"max-w-5xl mx-auto"}>
				<NavBar/>
				<section>
					<h1 className={"text-2xl font-bold"}>Employees List</h1>
					<div   className={"flex flex-col"}>
						<h2>
							My table
						</h2>
					</div>
				</section>
			</main>
		</>
	);
}

export default EmployeesList;