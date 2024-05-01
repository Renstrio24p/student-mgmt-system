import { DashboardRouter } from "components/router/Dashboard.router";
import { Common } from "redux/redux.types";
import { useTSComponent } from "utils/hooks/useTSComponent";
import { useTSElements } from "utils/hooks/useTSElements";

export default function Main(DOM: HTMLElement, data: Common) {
  // Main RealDOM UI
  useTSElements(
    DOM,
    /*html*/ `
      <div id='child'></div>
    `
  );

  useTSComponent("child", DOM, DashboardRouter, data);
}
