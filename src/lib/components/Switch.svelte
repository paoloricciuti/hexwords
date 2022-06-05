<script lang="ts">
    import type { Size } from "../types";

    export let checked: boolean = false;
    export let id: string = "";
    export let label: string = "";
    export let size: Size = "20px";
    export let trackSize: Size;
    export let margin: Size = "5px";
    export let activeBg: string = "#22ee22";
    export let bg: string = "#ddd";
    export let thumbBg: string = "#fff";
</script>

<input
    class="switch"
    style:--size={size}
    style:--track-size={trackSize}
    style:--margin={margin}
    style:--thumb-bg={bg}
    style:--thumb-bg-active={activeBg}
    style:--thumb={thumbBg}
    on:change
    {id}
    type="checkbox"
    bind:checked
/>
<label for={id}>
    {label}
</label>

<style>
    label {
        display: flex;
        gap: 1rem;
    }
    .switch {
        appearance: none;
        margin: 0;
        padding: 0;
        border: 0;
        background: var(--thumb-bg);
        display: block;
        width: var(--track-size, calc(var(--size) * 2));
        height: var(--size);
        position: relative;
        border-radius: var(--size);
        transition: background-color 400ms;
    }

    .switch:before {
        content: "";
        position: absolute;
        width: calc(var(--size) - var(--margin));
        height: calc(var(--size) - var(--margin));
        transform: translate(calc(var(--margin) / 2), calc(var(--margin) / 2));
        border-radius: 50%;
        background: var(--thumb);
        transition: transform 400ms;
        border: 1px solid #5555;
        box-sizing: border-box;
    }

    .switch:checked {
        background: var(--thumb-bg-active);
    }

    .switch:checked:before {
        transform: translate(
            calc(
                -100% + var(--track-size, calc(var(--size) * 2)) - var(
                        --margin
                    ) / 2
            ),
            calc(var(--margin) / 2)
        );
    }
</style>
