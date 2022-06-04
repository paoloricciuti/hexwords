<script lang="ts">
    export let search: string;
</script>

<input type="search" bind:value={search} placeholder="search..." />

<style>
    input {
        width: min(30rem, 90vw);
        margin: 1rem auto;
        display: block;
        box-shadow: 0 0 0.3rem 0 rgba(0 0 0 / 0.3);
        outline: 0;
        border: 0;
        border-radius: 10rem;
        padding: 0.3rem;
        transition: outline 75ms, outline-offset 75ms;
        outline-offset: 0rem;
        outline: 0;
    }
    input:focus {
        outline: 1px solid black;
        outline-offset: 0.25rem;
    }
</style>
