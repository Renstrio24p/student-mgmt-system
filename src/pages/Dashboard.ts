import Main from "components/elements/Main";
import Navbar from "components/elements/Navbar";
import { Common } from "redux/redux.types";
import { HTMLMainElement, HTMLNavElement } from "types/Food";
import { useTSElements } from "utils/hooks/useTSElements";
import { isAuthenticated } from "utils/routes/auth/isAuthorized";

export default function Dashboard(DOM: HTMLElement, data: Common) {

    useTSElements(DOM, (`
        <div class='flex items-center'>
            <div class='flex flex-col w-full relative'>
                <nav id='navbar' class='z-[40] p-3 flex items-center justify-between w-full shadow-md sticky top-0 bg-white object-cover'></nav>
                <main id='dashrouter' class='px-2 bg-teal-50 ${isAuthenticated(data.user[0]) ? 'animate-[fadeIn_3s]' : ''}'></main>
            </div>
        </div>
    `));

    // Mounting Navbar Element

    const navbar = DOM.querySelector('#navbar') as HTMLNavElement;
    Navbar(navbar, data.user);

    // Mounting Main Element

    const mainEl = DOM.querySelector('#dashrouter') as HTMLMainElement;
    Main(mainEl, data, data.user);
}
