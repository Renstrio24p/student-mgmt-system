import Courses from "pages/Courses/Courses";
import Exams from "pages/Exams/Exams";
import Login from "pages/Login";
import Menu from "pages/Menu/Menu";
import NotFound from "pages/NotFound";
import Quizzes from "pages/Quizzes/Quizzes";
import AddStudent from "pages/Students/AddStudent";
import Student from "pages/Students/Student";
import AddUser from "pages/Users/AddUser";
import Users from "pages/Users/Users";
import { Common } from "redux/redux.types";
import { isAuthenticated } from "utils/routes/auth/isAuthorized";
import { TSRouter } from "utils/routes/class/Router.class";

export const DashboardRouter = (DOM: HTMLElement, data: Common, card: Common['user'][number]) => {

    const routes = new TSRouter([
        {
            path: '/dashboard/',
            element: isAuthenticated(card) ? () => Menu(DOM) : () => window.location.href = '/dashboard/login'
        },
        {
            path: '/dashboard/login',
            element: () => Login(DOM)
        },
        {
            path: '/dashboard/users/',
            element: isAuthenticated(card) && card.role === 'superadmin' ? () => Users(DOM, data) : () => window.location.href = '/dashboard/'
        },
        {
            path: '/dashboard/users/add',
            element: isAuthenticated(card) && card.role === 'superadmin' ? () => AddUser(DOM) : () => window.location.href = '/dashboard/'
        },
        {
            path: '/dashboard/student/add',
            element: isAuthenticated(card) ? () => AddStudent(DOM) : () => window.location.href = '/dashboard/'
        },
        {
            path: '/dashboard/courses/',
            element: isAuthenticated(card) ? () => Courses(DOM) : () => window.location.href = '/dashboard/login'
        },
        {
            path: '/dashboard/quizzes/',
            element: isAuthenticated(card) ? () => Quizzes(DOM) : () => window.location.href = '/dashboard/login'
        },
        {
            path: '/dashboard/exams/',
            element: isAuthenticated(card) ? () => Exams(DOM) : () => window.location.href = '/dashboard/login'
        },
        {
            path: '/dashboard/students/',
            element: isAuthenticated(card) ? () => Student(DOM, data) : () => window.location.href = '/dashboard/login'
        },
        {
            path: '/dashboard/*',
            element: () => isAuthenticated(card) ? NotFound(DOM) : () => window.location.href = '/dashboard/login/'
        }
    ]);
    routes.navigate("");
};
