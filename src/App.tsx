import {Route, Routes} from "react-router-dom";
import CreateEmployeeForm from "@/pages/CreateEmployeeForm.tsx";
import EmployeesList from "@/pages/EmployeesList.tsx";

function App() {

    return (
    <Routes>
        <Route path="/" element={<CreateEmployeeForm />} />
        <Route path="/employees-list" element={<EmployeesList />} />
    </Routes>
  )
}

export default App
