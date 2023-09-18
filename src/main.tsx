import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '../node_modules/gnarly-date-picker/dist/style.css'
import {BrowserRouter} from "react-router-dom";
import {EmployeesProvider} from "@/hooks/EmployeesContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <EmployeesProvider>
            <App />
          </EmployeesProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
