import Courses from "pages/Courses/Courses";
import Exams from "pages/Exams/Exams";
import Menu from "pages/Menu/Menu";
import NotFound from "pages/NotFound";
import Quizzes from "pages/Quizzes/Quizzes";
import AddStudent from "pages/Students/AddStudent";
import Student from "pages/Students/Student";
import Users from "pages/Users/Users";
import { Common } from "redux/redux.types";
import { TSRouter } from "utils/routes/class/Router.class";

export const DashboardRouter = (DOM: HTMLElement, data: Common) => {
    const routes = new TSRouter([
        {
            path: '/dashboard/',
            element: () => Menu(DOM)
        },
        {
            path: '/dashboard/users/',
            element: () => Users(DOM, data)
        },
        {
            path: '/dashboard/student/add',
            element: () => AddStudent(DOM)
        },
        {
            path: '/dashboard/courses/',
            element: () => Courses(DOM)
        },
        {
            path: '/dashboard/quizzes/',
            element: () => Quizzes(DOM)
        },
        {
            path: '/dashboard/exams/',
            element: () => Exams(DOM)
        },
        {
            path: '/dashboard/students/',
            element: () => Student(DOM, data)
        },
        {
            path: '/dashboard/*',
            element: () => NotFound(DOM)
        }
    ]);
    routes.navigate("");
};
