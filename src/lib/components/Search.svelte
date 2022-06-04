<script lang="ts">
    export let search: string;
</script>

<div>
    <input type="search" bind:value={search} placeholder="search..." />
</div>

<style>
    div {
        position: sticky;
        top: 0;
        background-color: inherit;
        padding-block: 1rem;
    }
    input {
        width: min(30rem, 90vw);
        margin: 0 auto;
        display: block;
        box-shadow: 0 0 0.3rem 0 rgba(0 0 0 / 0.3);
        outline: 0;
        border: 0;
        border-radius: 10rem;
        padding: 0.3rem 0.7rem;
    }
    input:focus {
        box-shadow: 0 0 0.5rem 0 rgba(0 0 0 / 0.7);
    }
</style>
