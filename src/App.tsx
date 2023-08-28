import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

function App() {
    const formSchema = z.object({
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50),
        birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be a valid date"),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be a valid date"),
        street: z.string().min(2).max(50),
        city: z.string().min(2).max(50),
        state: z.string().min(2).max(50),
        zip: z.string().min(5).max(6),
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
        <header>
            <h1 className="text-4xl border-b-2">HRnet</h1>
        </header>
        <main>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/employee-list">Employee list</a></li>
                </ul>
            </nav>
            <section>
                <h2>Create employee</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
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
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </section>
        </main>
    </>
  )
}

export default App
