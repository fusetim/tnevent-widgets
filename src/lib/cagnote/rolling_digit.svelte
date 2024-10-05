<script lang="ts">
	import { quintIn, quintInOut } from "svelte/easing";
	import { fade, fly, slide } from "svelte/transition";

	interface RollingDigitProps {
        value: string,
        height?: number,
        delay?: number,
    };

    let { value, height = 10, delay = 0, ...others } : RollingDigitProps = $props();
    let old_value = $state("0");

    $effect(() => {
        if (old_value != value) {
            old_value = value
        }
    })
</script>

<div
    class="overflow-clip"
    style="height: {height*4}px"
>
    {#if old_value != value}
        <p out:fly={{delay: delay, duration:500, y:-height*4}}>{old_value}</p>
    {:else}
        <p in:fly={{delay: delay + 500, duration:500, y:height*4}}>{value}</p>
    {/if}
</div>