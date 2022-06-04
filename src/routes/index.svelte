<script lang="ts">
    import Search from "../lib/components/Search.svelte";

    import HexWords from "../lib/components/HexWords.svelte";
    import type { IHexWord } from "../lib/types";
    import wordsJson from "../lib/words/words.json";
    let words: IHexWord[] = wordsJson;
    let query: string = "";
    let selectedColor: string = "";
</script>

<main style:--selected-color={selectedColor}>
    <Search bind:search={query} />
    <HexWords {words} {query} on:select={(e) => (selectedColor = e.detail)} />
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
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
