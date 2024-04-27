import DOMPurify from "dompurify";

export function Sanitizer(data: string) {
    return DOMPurify.sanitize(data)
}