import { scriptElement } from "utils/purify/purify";
import { Router } from "./utils/routes/Router";
import { HTMLSidebarElement } from "types/Food";
import Sidebar from "components/elements/Sidebar";

export default function Start(DOM: HTMLElement) {
    DOM.innerHTML = `
        <div class='flex items-center relative'>
            <aside id='sidebar' class='w-[220px] bg-cyan-800 fixed top-0 h-[100vh]'></aside>
            <div class='w-full ml-[220px]' id='router'></div>
        </div>
    `;

    const sidebar = DOM.querySelector('#sidebar') as HTMLSidebarElement;
    const routerContainer = DOM.querySelector('#router') as HTMLElement;

    // Append script element to sidebar
    sidebar.append(scriptElement);

    // Initialize and render Sidebar
    Sidebar(sidebar);

    // Append script element to router container
    routerContainer.append(scriptElement);

    // Initialize Router
    Router(routerContainer);
}
