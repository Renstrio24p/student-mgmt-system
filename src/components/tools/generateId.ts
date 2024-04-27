
let idCounter = 0;

export function generateId(): number {
    return ++idCounter;
}