import Main from "components/elements/Main";
import Navbar from "components/elements/Navbar";
import { HTMLMainElement, HTMLNavElement } from "types/Food";
import { scriptElement } from "utils/purify/purify";

export default function Dashboard(DOM: HTMLElement) {

    DOM.innerHTML = (`
        <div class='flex items-center'>
            <div class='flex flex-col w-full relative'>
                <nav id='navbar' class='z-[60] p-3 flex items-center justify-between w-full shadow-md sticky top-0 bg-white object-cover'></nav>
                <main id='dashrouter' class='px-2 bg-teal-50 animate-[fadeIn_2s]'></main>
            </div>
        </div>
    `);

    // Mounting Navbar Element

    const navbar = DOM.querySelector('#navbar') as HTMLNavElement;
    navbar.append(scriptElement);
    Navbar(navbar);

    // Mounting Main Element

    const mainEl = DOM.querySelector('#dashrouter') as HTMLMainElement;
    mainEl.append(scriptElement);
    Main(mainEl);
}
