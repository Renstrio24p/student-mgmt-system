export const useTSElementEach = (
  selector: string,
  events: (keyof HTMLElementEventMap)[],
  callback: (element: HTMLElement, eventType: string) => void
) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    events.forEach(eventType => {
      element.addEventListener(eventType, () => {
        callback(element as HTMLElement, eventType);
      });
    });
  });
};
