<script lang="ts">
    import { snacks } from "../stores/snackstores";
    import { fly } from "../transitions/fly";
    import close from "../../assets/close.svg";

    const severityMapping = {
        success: "check",
        warning: "warning",
        error: "error",
    } as const;
</script>

<aside>
    {#each $snacks as snack (snack.id)}
        <div transition:fly|local={{ x: "100%" }}>
            <span>
                {snack.message}
            </span>
            {#if snack.closable}
                <button
                    on:click={() => {
                        snacks.close(snack);
                    }}
                >
                    <img src={close} alt="close" />
                </button>
            {/if}
        </div>
    {/each}
</aside>

<style>
    aside {
        --padding: 1rem;
        position: fixed;
        right: 0;
        bottom: 0;
        width: max(30vw, 15rem);
        overflow: hidden;
        padding: var(--padding);
        display: grid;
        gap: 0.5rem;
        z-index: 100;
    }
    aside:empty {
        display: none;
    }
    div {
        background-color: black;
        padding: 1rem;
        border-radius: 0.3rem;
        display: grid;
        grid-template-columns: 1fr min-content;
        align-items: center;
        gap: 0.5rem;
        background-color: #90ee90;
        color: black;
        grid-template-columns: 1fr min-content;
    }
    div > button {
        cursor: pointer;
        background-color: transparent;
        margin: 0;
        padding: 0;
        color: currentColor;
        box-shadow: unset;
        border: 0;
    }
</style>
