import Dashboard from "pages/Dashboard"
import { TSRouter } from "./class/Router.class"
import { Common } from "redux/redux.types"

export const Router = (DOM: HTMLElement, data: Common) => {
    const routes = new TSRouter([
        {
            path: '/dashboard',
            element: () => Dashboard(DOM, data)
        },
        {
            path: '/',
            routeto: '/dashboard/',
            element: () => Dashboard(DOM, data)
        },
        {
            path: '/dashboard',
            routeto: '/dashboard/',
            element: () => Dashboard(DOM, data)
        },
        {
            path: '*',
            routeto: '/dashboard/',
            element: () => Dashboard(DOM, data)
        },
    ])
    routes.navigate("")
}