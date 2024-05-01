import { useTSElements } from "utils/hooks/useTSElements";

export default function Footer(DOM: HTMLElement) {
  useTSElements(
    DOM,
    /*html*/ `
    <div>
      <h1>Footer</h1>
    </div>
  `
  );
}
