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
<div style:--selected-color={searchColor}>
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
    pre {
        margin: 0;
    }
    div {
        position: sticky;
        top: 0;
        background-color: var(--selected-color);
        padding-block: 1rem;
        display: grid;
        font-family: system-ui;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        grid-template-columns: max-content max-content max-content;
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
