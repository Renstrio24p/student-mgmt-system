import Statistics from "components/sections/Statistics";
import Welcome from "components/sections/Welcome";
import { useTSElements } from "utils/hooks/useTSElements";

// Menu Component Parent Section

export default function Menu(DOM: HTMLElement) {

  useTSElements(DOM, (`
      <section id='welcome' class='m-6'></section>
      <section id='statistics' class='m-6'></section>
  `));

  const welcomeSection = DOM.querySelector('#welcome') as HTMLElement
  Welcome(welcomeSection)

  const statisticsSection = DOM.querySelector('#statistics') as HTMLElement
  Statistics(statisticsSection)

}