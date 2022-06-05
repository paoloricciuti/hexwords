<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { IHexWord } from "../types";
    import { contrast, distance, hexToRgb, mixAlpha, rgbToHex } from "../utils";
    export let words: IHexWord[];
    export let query: string = "";
    export let alpha: boolean;
    export let queryColor: string;

    const dispatch = createEventDispatcher();

    $: orderedWords = !!queryColor
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
        font-family: system-ui;
        font-weight: bold;
        background-color: var(--color, transparent);
        padding: var(--_padding);
        border-radius: 0.5rem;
    }
    button {
        width: 100%;
        height: 100%;
        background: transparent;
        border: 0;
    }
    small {
        font-size: 0.6rem;
    }
    .hidden {
        display: none;
    }
</style>
