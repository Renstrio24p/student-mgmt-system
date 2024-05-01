import Main from "components/elements/Main";
import Navbar from "components/elements/Navbar";
import { Common } from "redux/redux.types";
import { useTSComponent } from "utils/hooks/useTSComponent";
import { useTSElements } from "utils/hooks/useTSElements";

export default function Dashboard(DOM: HTMLElement, data: Common) {
  useTSElements(
    DOM,
    /*html*/ `
        <div class='flex items-center'>
            <div class='flex flex-col w-full relative'>
                <nav id='navbar' class='z-[40] p-3 flex items-center justify-between w-full shadow-md sticky top-0 bg-white object-cover'></nav>
                <main id='dashrouter' class='px-2 bg-teal-50'></main>
            </div>
        </div>
    `
  );

  // Mounting Navbar Element

  useTSComponent("navbar", DOM, Navbar);
  useTSComponent("dashrouter", DOM, Main, data);
}
