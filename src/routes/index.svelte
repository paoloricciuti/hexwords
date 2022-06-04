<script lang="ts">
    export let words: any;
    console.log(words);
</script>

{#each words as word (word)}
    <div style:background-color={word.hex}>
        {word.hex}
    </div>
{/each}

<style>
    div {
        padding: 1rem;
        text-align: center;
        font-family: system-ui;
    }
</style>
