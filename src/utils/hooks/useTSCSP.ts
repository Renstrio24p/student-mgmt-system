export const useTSCSP = (
  scriptSrc: string = "'self'",
  styleSrc: string = "'self'",
  objectSrc: string = "'none'",
  connectSrc: string[] = ["'self'"]
) => {
  document.addEventListener("DOMContentLoaded", () => {
    const metaElement = document.createElement("meta");

    metaElement.setAttribute("http-equiv", "Content-Security-Policy");
    metaElement.setAttribute(
      "content",
      `script-src ${scriptSrc}; style-src ${styleSrc}; object-src ${objectSrc}; connect-src ${connectSrc.join(
        " "
      )};`
    );
    document.head.appendChild(metaElement);
  });
};
