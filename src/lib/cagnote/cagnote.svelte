<script lang="ts">
	import { fly, slide } from "svelte/transition";
    import RollingDigit from "./rolling_digit.svelte";

	interface CagnoteParams {
		title?: string;
		value: bigint;
	}

	let { title = 'Cagnote', value = 0n }: CagnoteParams = $props();

	let eur = $derived(Number(value / 100n).toString());

	let cents_fmt = Intl.NumberFormat('fr', {
		minimumIntegerDigits: 2
	});

	let cents = $derived(cents_fmt.format(Number(value % 100n)));
</script>

<div class="flex flex-col items-start">
	<p class="font-bold text-3xl text-purple-500 uppercase">{title}</p>
	<div class="bg-purple-200 pt-4 pb-2 px-8 rounded-xl">
		<div class="text-4xl font-black text-purple-800 overflow-clip inline-flex items-baseline">
			{#each eur.split('') as digit}
				<div in:slide={{axis:"x", duration:200}} class="text-5xl">
                    <RollingDigit value={digit} height={12} delay={200}>
                    </RollingDigit>
                </div>
			{/each}
			<p>,</p>
			{#each cents.split('') as digit}
                <RollingDigit value={digit} height={12}>
                </RollingDigit>
			{/each}
			<p class="text-5xl ml-2">€</p>
            </div>
	</div>
</div>
