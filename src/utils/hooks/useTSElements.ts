import DOMPurify from 'dompurify';

export const useTSElements = (htmlElement: HTMLElement, element: string) => {
    const sanitizedContent = DOMPurify.sanitize(element);

    while (htmlElement.innerHTML !== sanitizedContent) {
        htmlElement.innerHTML = sanitizedContent;
    }
};
