import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/shared/er404";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import PrivateRoute from "../private/PrivateRoute";
import Task from "../pages/Task/Task";
import CreateTask from "../pages/Task/CreateTask";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/task",
        element: (
          <PrivateRoute>
            <Task />
          </PrivateRoute>
        ),
      },
      {
        path: "/task/create",
        element: (
          <PrivateRoute>
            <CreateTask />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
