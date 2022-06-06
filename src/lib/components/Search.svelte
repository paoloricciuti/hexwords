<script lang="ts">
    import { hexToRgb, mixAlpha } from "../utils";

    import ColorPicker from "./ColorPicker.svelte";
    import Switch from "./Switch.svelte";

    export let search: string;
    export let alpha: boolean;
    export let color: string;
    export let selectedColor: string;
    $: searchColor = (() => {
        if (selectedColor.length === 7) return selectedColor;
        const mix = mixAlpha(hexToRgb(selectedColor));
        const hex = `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
        return hex;
    })();
</script>

<h1><pre>#HEXWORDS</pre></h1>
<h2>Why bother with a random green when you can choose to be a #BADA55!</h2>
<div class="credits">
    Built with love by <a
        target="_blank"
        href="https://github.com/paoloricciuti/hexwords"
        >paoloricciuti <svg
            height="16"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            class="octicon octicon-mark-github v-align-middle"
        >
            <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
        </svg></a
    >
</div>
<div class="search" style:--selected-color={searchColor}>
    <input type="search" bind:value={search} placeholder="search..." />
    <Switch
        bind:checked={alpha}
        id="toggle-alpha"
        trackSize="2rem"
        label="Alpha"
    />
    <ColorPicker bind:color />
</div>

<style>
    h1 {
        text-align: center;
        padding: 0.5rem;
        margin: 0;
    }
    h2 {
        text-align: center;
        font-weight: 100;
        max-width: 90vw;
        margin: auto;
    }
    pre {
        margin: 0;
    }
    .credits {
        text-align: center;
    }
    .credits > a {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        color: inherit;
    }
    .search {
        position: sticky;
        top: 0;
        background-color: var(--selected-color);
        padding-block: 1rem;
        display: grid;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        grid-template-columns: max-content max-content max-content;
        z-index: 10;
    }
    input:not([type="checkbox"]) {
        width: min(30rem, 50vw);
        display: block;
        box-shadow: 0 0 0.3rem 0 rgba(0 0 0 / 0.3);
        outline: 0;
        border: 0;
        border-radius: 10rem;
        padding: 0.3rem 0.7rem;
    }
    input:not([type="checkbox"]):focus {
        box-shadow: 0 0 0.5rem 0 rgba(0 0 0 / 0.7);
    }
</style>
