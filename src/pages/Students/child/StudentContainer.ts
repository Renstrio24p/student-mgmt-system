import { scriptElement } from "utils/purify/purify";
import Cards from "components/common/Cards";
import { Common } from "redux/redux.types";

export default function StudentContainer(DOM: HTMLElement, data: Common['student']) {

  DOM.innerHTML = (`
    <div class='mt-6'>
        <h1>Enrolled Students</h1>
        <hr class='py-3'>
        <div id='cards'></div>
    </div>
    `);

  const cardsContainer = DOM.querySelector('#cards') as HTMLElement;
  cardsContainer.appendChild(scriptElement);

  // Cards Component expecting props 
  // <Cards cardsContainer={cardsContainer} studentPlaceholder={studentPlaceholder} />
  Cards(cardsContainer, data);
}
