<script lang="ts">
    import Search from "../lib/components/Search.svelte";

    import HexWords from "../lib/components/HexWords.svelte";
    import type { IHexWord } from "../lib/types";
    import wordsJson from "../lib/words/words.json";
    import { contrast, hexToRgb, mixAlpha } from "../lib/utils";
    import Snackbars from "../lib/components/Snackbars.svelte";
    let words: IHexWord[] = wordsJson;
    let query: string = "";
    let alpha: boolean = false;
    let selectedColor: IHexWord = {
        background: "#ffffff",
        color: "black",
        hex: "#ffffff",
        score: 2,
        word: "default",
    };
    let queryColor: string = "";
</script>

<Snackbars />
<main
    style:color={selectedColor.color}
    style:--selected-color={selectedColor.background}
>
    <Search
        bind:search={query}
        bind:color={queryColor}
        bind:alpha
        bind:selectedColor
    />
    <HexWords
        {words}
        {query}
        on:select={(e) => (selectedColor = e.detail)}
        {alpha}
        {queryColor}
    />
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: monospace;
    }
    :global(*) {
        box-sizing: border-box;
    }
    main {
        width: 100%;
        min-height: 100vh;
        background-color: var(--selected-color, white);
    }
</style>
