import DOMPurify from "dompurify";

export const useTSComponent = (
  id: string,
  DOM: HTMLElement,
  element: Function,
  params?: any
) => {
  DOMPurify.sanitize(DOM);
  element(DOM.querySelector(`#${id}`), params);
};
