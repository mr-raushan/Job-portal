import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Browse from "./components/Browse";
import Jobs from "./components/jobs";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./admin/Companies";
import CreateCompanies from "./admin/CreateCompanies";
import CompanySetup from "./admin/CompanySetup";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompanies />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
