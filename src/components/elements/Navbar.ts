import { Common } from "redux/redux.types";
import { HTMLSidebarElement } from "types/Food";
import { useTSElements } from "utils/hooks/useTSElements";

export default function Navbar(DOM: HTMLElement, data: Common['user']) {

    const loggedInUserEmail = localStorage.getItem('email');

    const loggedInUser = data.find(user => user.email === loggedInUserEmail);

    const dataspecific = { user: loggedInUser }

    useTSElements(DOM, (`
        <div class='flex items-center gap-3'>
            <i class="ri-menu-line cursor-pointer" id='collapse'></i>
            <div>
                <input type='text' placeholder='Search...' />
            </div>
        </div>

        <div class='flex items-center justify-center gap-4 relative'>
            <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 bottom-0 right-0"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"><i class="ri-notification-line"></i></span>
            </span>
            <div class='rounded-full overflow-hidden w-[30px] h-[30px]'>
                <img src='${dataspecific.user?.image}' alt='profile' class='w-full h-full' />
            </div>
            <i class="ri-more-line"></i>
            <button id='logout'>Logout</button>
        </div>
    `))

    const collapseSidebar = DOM.querySelector('#collapse') as HTMLElement;
    const sidebarEl = document.getElementById('sidebar') as HTMLSidebarElement;
    const routerEl = document.getElementById('router') as HTMLElement;
    const logoutBtn = document.getElementById('logout') as HTMLButtonElement;

    collapseSidebar.addEventListener('click', () => {
        sidebarEl.classList.toggle('left-[-220px]');
        if (sidebarEl.classList.contains('left-[-220px]')) {
            routerEl.classList.remove('ml-[220px]');
        } else {
            routerEl.classList.add('ml-[220px]');
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.clear()
        window.location.reload()
    })
}
