<script lang="ts">
    import Switch from "./Switch.svelte";

    export let search: string;
    export let alpha: boolean;
</script>

<h1><pre>#HEXWORDS</pre></h1>
<div>
    <input type="search" bind:value={search} placeholder="search..." />
    <Switch
        bind:checked={alpha}
        id="toggle-alpha"
        trackSize="2rem"
        label="Alpha"
    />
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
        background-color: inherit;
        padding-block: 1rem;
        display: flex;
        font-family: system-ui;
        justify-content: center;
        align-items: center;
        gap: 1rem;
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
    input[type="checkbox"] {
        accent-color: var(--selected-color);
    }
</style>
