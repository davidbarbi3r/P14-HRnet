import * as z from 'zod'

function App() {
    const formSchema = z.object({
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50),
        birthDate: z.date(),
        startDate: z.date(),
        street: z.string().min(2).max(50),
        city: z.string().min(2).max(50),
        state: z.string().min(2).max(50),
        zip: z.string().min(2).max(50),
        department: z.string().min(2).max(50),
    })
    return (
    <>
        <header>
            <h1 className="text-4xl border-b-2 text-base">HRnet</h1>
        </header>
        <main>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="/employee-list">Employee list</a></li>
                </ul>
            </nav>
            <section>
                <h2>Create employee</h2>
            </section>
        </main>
    </>
  )
}

export default App
