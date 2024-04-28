import Main from "components/elements/Main";
import Navbar from "components/elements/Navbar";
import { HTMLMainElement, HTMLNavElement } from "types/Food";
import { useTSElements } from "utils/hooks/useTSElements";

export default function Dashboard(DOM: HTMLElement) {

    useTSElements(DOM, (`
        <div class='flex items-center'>
            <div class='flex flex-col w-full relative'>
                <nav id='navbar' class='z-[60] p-3 flex items-center justify-between w-full shadow-md sticky top-0 bg-white object-cover'></nav>
                <main id='dashrouter' class='px-2 bg-teal-50 animate-[fadeIn_2s]'></main>
            </div>
        </div>
    `));

    // Mounting Navbar Element

    const navbar = DOM.querySelector('#navbar') as HTMLNavElement;
    Navbar(navbar);

    // Mounting Main Element

    const mainEl = DOM.querySelector('#dashrouter') as HTMLMainElement;
    Main(mainEl);
}
