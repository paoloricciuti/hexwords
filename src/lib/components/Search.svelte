<script lang="ts">
    export let search: string;
</script>

<input type="search" bind:value={search} />

<style>
    input {
        margin: 1rem auto;
    }
</style>
