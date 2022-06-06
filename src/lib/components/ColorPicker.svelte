<script lang="ts">
    export let color: string;
</script>

<div>
    <input
        bind:value={color}
        type="search"
        placeholder="order by proximity to..."
    />
    <input
        value={color}
        on:change={(e) => (color = e.currentTarget.value)}
        type="color"
    />
</div>

<style>
    div {
        grid-column: 1/-1;
        display: grid;
        grid-template-columns: 1fr min-content;
    }
    input {
        outline: 0;
        border: 0;
    }
    input[type="color"] {
        background-color: var(--selected-color);
    }
    input[type="search"] {
        box-shadow: 0 0 0.3rem 0 rgba(0 0 0 / 0.3);
        border-radius: 10rem;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        padding: 0.3rem 0.7rem;
    }
    input:focus {
        box-shadow: 0 0 0.5rem 0 rgba(0 0 0 / 0.7);
    }
</style>
