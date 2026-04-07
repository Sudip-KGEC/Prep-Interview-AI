import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import AppLayout from "./app/layouts/AppLayout";

export const router = createBrowserRouter([
  {
    element: <Protected><AppLayout /></Protected>,
    children: [
      {
        path: "/",
        element: <h1>Welcome to CodePrep AI</h1>,
      },
      {
        path: "/interview-plan",
        element: <Home />, // your real page
      },
      {
        path: "/ebooks",
        element: <h1>E-Book Store Page</h1>,
      },
      {
        path: "/internships",
        element: <h1>Internships Page</h1>,
      },
      {
        path: "/blogs",
        element: <h1>Tech Blogs Page</h1>,
      },
      {
        path: "/codewar",
        element: <h1>Codewar AI (Coming Soon)</h1>,
      },
      {
        path: "/interview/:interviewId",
        element: <Interview />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);