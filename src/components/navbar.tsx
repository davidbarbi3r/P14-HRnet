export default function NavBar () {
	return (
		<nav className={"max-w-5xl p-4 lg:px-0"}>
			<ul className={"flex gap-4"}>
				<li><a href="/">Home</a></li>
				<li><a href="/employee-list">Employee list</a></li>
			</ul>
		</nav>
	)
}