import Dashboard from "pages/Dashboard"
import { TSRouter } from "./class/Router.class"

export const Router = (DOM: HTMLElement) => {
    const routes = new TSRouter([
        {
            path: '/dashboard',
            element: () => Dashboard(DOM)
        },
        {
            path: '/',
            routeto: '/dashboard/',
            element: () => Dashboard(DOM)
        },
        {
            path: '/dashboard',
            routeto: '/dashboard/',
            element: () => Dashboard(DOM)
        }
    ])
    routes.navigate("")
}