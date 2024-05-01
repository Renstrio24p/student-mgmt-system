import Courses from "pages/Courses/Courses";
import Exams from "pages/Exams/Exams";
import Menu from "pages/Menu/Menu";
import NotFound from "pages/NotFound";
import Quizzes from "pages/Quizzes/Quizzes";
import AddStudent from "pages/Students/AddStudent";
import Student from "pages/Students/Student";
import AddUser from "pages/Users/AddUser";
import Users from "pages/Users/Users";
import { Common } from "redux/redux.types";
import { useTSAuth } from "utils/hooks/useTSAuth";
import { TSRouter } from "utils/routes/class/Router.class";

export const DashboardRouter = (DOM: HTMLElement, data: Common) => {
  const routes = new TSRouter([
    {
      path: "/dashboard/",
      element: () => useTSAuth(Menu(DOM), "/login"),
    },
    {
      path: "/dashboard/users/",
      element: () => useTSAuth(Users(DOM, data), "/login"),
    },
    {
      path: "/dashboard/users/add",
      element: () => useTSAuth(AddUser(DOM), "/login"),
    },
    {
      path: "/dashboard/student/add",
      element: () => useTSAuth(AddStudent(DOM), "/login"),
    },
    {
      path: "/dashboard/courses/",
      element: () => useTSAuth(Courses(DOM), "/dashboard/login"),
    },
    {
      path: "/dashboard/quizzes/",
      element: () => useTSAuth(Quizzes(DOM), "/dashboard/login"),
    },
    {
      path: "/dashboard/exams/",
      element: () => useTSAuth(Exams(DOM), "/dashboard/login"),
    },
    {
      path: "/dashboard/students/",
      element: () => useTSAuth(Student(DOM, data), "/dashboard/login"),
    },
    {
      path: "/dashboard/*",
      element: () => useTSAuth(NotFound(DOM), "/dashboard/login"),
    },
  ]);
  routes.navigate("");
};
