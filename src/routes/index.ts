import words from "./words.json";
export async function get() {
    return {
        body: { words },
    };
}