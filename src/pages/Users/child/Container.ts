import { scriptElement } from "utils/purify/purify";
// import { placeholderCards } from "../static/User.dat";
import Cards from "components/common/Cards";
import { Common } from "redux/redux.types";

export default function Container(DOM: HTMLElement, data: Common[keyof Common]) {


    DOM.innerHTML = (`
    <div class='mt-6'>
        <h1>Users</h1>
        <hr class='py-3'>
        <div id='cards'></div>
    </div>
    `);

    const cardsContainer = DOM.querySelector('#cards') as HTMLElement;
    cardsContainer.appendChild(scriptElement);

    // Cards Component expecting props
    Cards(cardsContainer, data);
}
