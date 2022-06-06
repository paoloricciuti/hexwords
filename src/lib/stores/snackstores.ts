import type { Snackbar } from "$lib/types";
import { writable } from "svelte/store";

function* getId(): Generator<number, number, unknown> {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const createSnackStore = () => {
    const id = getId();
    const { subscribe, update } = writable<Snackbar[]>([]);
    return {
        subscribe,
        addSnack: (snackbar: Snackbar) => {
            update((prev: Snackbar[]) => {
                const toAdd: Snackbar = { id: id.next().value, ...snackbar };
                if (snackbar?.timeout !== undefined && snackbar?.timeout > 0) {
                    setTimeout(() => {
                        update(prevTime => prevTime.filter(elem => elem !== toAdd));
                    }, snackbar.timeout);
                }
                return [...prev, toAdd];
            });
        },
        close: (snackbar: Snackbar) => {
            update(prevTime => prevTime.filter(elem => elem !== snackbar));
        }
    };
};

export const snacks = createSnackStore();