import DOMPurify from 'dompurify';

export const useTSElements = (htmlElement: HTMLElement, element: string) => {
    const sanitizedContent = DOMPurify.sanitize(/*html*/element);

    if (htmlElement.innerHTML !== sanitizedContent) {
        return htmlElement.innerHTML = sanitizedContent;
    }
};
