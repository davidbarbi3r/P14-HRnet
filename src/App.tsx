import {Route, Routes} from "react-router-dom";
import CreateEmployeeForm from "@/pages/CreateEmployeeForm.tsx";

function App() {

    return (
    <Routes>
        <Route path="/" element={<CreateEmployeeForm />} />
{/*
        <Route path="/employee-list" element={<EmployeeList />} />
*/}
    </Routes>
  )
}

export default App
