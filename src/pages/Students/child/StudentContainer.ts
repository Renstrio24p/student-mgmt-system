import Cards from "components/common/Cards";
import { Common } from "redux/redux.types";
import { useTSElements } from "utils/hooks/useTSElements";

export default function StudentContainer(DOM: HTMLElement, data: Common['student']) {

  useTSElements(DOM, (`
    <div class='mt-6'>
        <h1>Enrolled Students</h1>
        <hr class='py-3'>
        <div id='cards'></div>
    </div>
    `));

  const cardsContainer = DOM.querySelector('#cards') as HTMLElement;
  Cards(cardsContainer, data);
}
