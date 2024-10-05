<svelte:options runes={true} />
<script lang="ts">
	import Cagnote from '$lib/cagnote/cagnote.svelte';

	let value = $state(0n);

    function add(incr: bigint) {
        value = value + incr
    }
</script>

<main
	class="border-8 border-yellow-500 w-screen h-screen overflow-clip flex flex-col justify-center items-center"
>
	<Cagnote value={value}></Cagnote>
	<div class="mt-8 p-4 border-4 border-yellow-500 rounded-xl flex flex-row gap-1">
        {#each [100000n,10000n,1000n,100n,10n,1n] as incr}
		<button
            onclick={() => add(incr)}
			class="font-bold bg-yellow-500 hover:bg-yellow-600 active:bg-orange-500 px-2 py-1 border-yellow-700 border-2 transition-colors"
			>+{Number(incr)/100}€</button
		>
        {/each}
	</div>
</main>
