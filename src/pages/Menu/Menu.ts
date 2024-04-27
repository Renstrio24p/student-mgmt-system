import Statistics from "components/sections/Statistics";
import Welcome from "components/sections/Welcome";
import { scriptElement } from "utils/purify/purify";

// Menu Component Parent Section

export default function Menu(DOM: HTMLElement) {

  DOM.innerHTML = (`
      <section id='welcome' class='m-6'></section>
      <section id='statistics' class='m-6'></section>
  `);

  const welcomeSection = DOM.querySelector('#welcome') as HTMLElement
  welcomeSection.append(scriptElement)
  Welcome(welcomeSection)

  const statisticsSection = DOM.querySelector('#statistics') as HTMLElement
  statisticsSection.append(scriptElement)
  Statistics(statisticsSection)

}