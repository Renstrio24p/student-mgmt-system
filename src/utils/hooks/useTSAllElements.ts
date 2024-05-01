export const useTSEventAll = <T extends Event>(
  selector: string,
  eventType: keyof HTMLElementEventMap,
  handler: (event: T) => void
) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.addEventListener(eventType, handler as EventListener);
  });

  return () => {
    elements.forEach(element => {
      element.removeEventListener(eventType, handler as EventListener);
    });
  };
};
