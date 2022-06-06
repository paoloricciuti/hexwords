<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { IHexWord } from "../types";
    import { contrast, distance, hexToRgb, isHex, mixAlpha } from "../utils";
    import { snacks } from "../stores/snackstores";
    export let words: IHexWord[];
    export let query: string = "";
    export let alpha: boolean;
    export let queryColor: string;

    const dispatch = createEventDispatcher();

    $: orderedWords =
        !!queryColor && isHex(queryColor)
            ? [...words].sort(
                  (a, b) =>
                      distance(a.hex, queryColor) - distance(b.hex, queryColor)
              )
            : words;

    $: filteredWords = orderedWords.map(
        (word) =>
            (word.word.length !== 8 || alpha) &&
            word.word.toLowerCase().includes(query.toLowerCase())
    );
</script>

<ul>
    {#each orderedWords as word, index (word.word)}
        {@const changeColor = contrast(hexToRgb(word.hex), [0, 0, 0]) < 3.5}
        {@const color = (() => {
            if (word.word.length === 6) return word.hex;
            const mix = mixAlpha(hexToRgb(word.hex));
            const hex = `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
            return hex;
        })()}
        <li style:--color={color} class:hidden={!filteredWords[index]}>
            <button
                style:color={changeColor ? "white" : "black"}
                on:click={() => dispatch("select", word.hex)}
            >
                {word.hex}
                <br />
                <small>({word.word})</small>
            </button>
            <button
                class="copy"
                style:color={changeColor ? "white" : "black"}
                on:click={() =>
                    navigator?.clipboard?.writeText(word.hex).then(() =>
                        snacks.addSnack({
                            message: `Color ${word.hex} copied to clipboard`,
                            timeout: 5000,
                            closable: true,
                        })
                    )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="currentColor"
                    ><path d="M0 0h24v24H0V0z" fill="none" /><path
                        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                    /></svg
                >
            </button>
        </li>
    {/each}
</ul>

<style>
    ul {
        margin: auto;
        padding: 0;
        list-style: none;
        display: grid;
        justify-content: center;
        gap: 0.5rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
        max-width: 90vw;
    }
    li {
        --_padding: 0.5rem;
        text-align: center;
        font-weight: bold;
        background-color: var(--color, transparent);
        padding: var(--_padding);
        border-radius: 0.5rem;
        position: relative;
    }
    button {
        width: 100%;
        height: 100%;
        background: transparent;
        border: 0;
        font-family: monospace;
    }
    .copy {
        position: absolute;
        top: 50%;
        right: var(--_padding);
        width: fit-content;
        padding: 0;
        height: auto;
        transform: translateY(-50%);
    }
    small {
        font-size: 0.6rem;
    }
    .hidden {
        display: none;
    }
</style>
