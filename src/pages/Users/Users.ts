import Greeting from "components/common/Greeting";
import { scriptElement } from "utils/purify/purify";
import Container from "./child/Container";
import { Common } from "redux/redux.types";

export default function Users(DOM: HTMLElement, data: Common) {

    const userData = data.user

    DOM.innerHTML = (`
        <section class='m-6'>
            <div id='greet'></div>
            <div id='container'></div>
        </section>
  `);

    // Reusable Greeting Component
    const greeting = DOM.querySelector('#greet') as HTMLElement
    greeting.append(scriptElement)
    Greeting(greeting, "Here's the list of user registered available within your system.")

    const container = DOM.querySelector('#container') as HTMLElement
    container.appendChild(scriptElement)
    Container(container, userData)
}