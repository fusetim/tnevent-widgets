<script lang="ts">
	import Cagnote from '$lib/cagnote/cagnote.svelte';
	import DonationGoals from '$lib/goals/donation_goals.svelte';
	import { type DonationGoal } from '$lib/goals/donation_goals';
	import Icon from '@iconify/svelte';

	const goals = [
		{ goal: 10000n, title: 'On fait tomber les masques' },
		{ goal: 25000n, title: 'Speedrun Lucky Minecraft Hardcore' },
		{ goal: 50000n, title: 'MicroFoutoir (min. 20 personnes)' },
		{ goal: 66600n, title: "J'₳₦₦ɄⱠɆ ⱠɆ ₮₦ɆVɆ₦₮" },
		{ goal: 100000n, title: 'Un shot par colloc de TN' }
	] as DonationGoal[];

	let value = $state(0n);

	function add(incr: bigint) {
		value = value + incr;
	}
</script>

<main
	class="border-8 border-yellow-500 bg-slate-950 w-screen h-screen overflow-clip flex flex-col justify-center items-center"
>
	<!--
	<div class="mt-8 p-4 border-2 border-yellow-500 rounded-xl text-sm">
		<Cagnote {value}></Cagnote>
	</div>
	-->
	<div class="mt-8 p-4 border-4 border-yellow-500 rounded-xl flex flex-row gap-1">
		{#each [100000n, 10000n, 1000n, 100n, 10n, 1n] as incr}
			<button
				onclick={() => add(incr)}
				class="font-bold bg-yellow-500 hover:bg-yellow-600 active:bg-orange-500 px-2 py-1 border-yellow-700 border-2 transition-colors"
				>+{Number(incr) / 100}€</button
			>
		{/each}
	</div>
	<DonationGoals {value} {goals}></DonationGoals>
	<div class="h-8"></div>
	<div
		class="border-2 border-purple-500 p-4 rounded-xl flex flex-col justify-center items-stretch w-[28rem]"
	>
		<div class="mt-4 mb-1 relative text-white bg-purple-950 p-2 pt-4 text-sm rounded-md border-purple-400 border-2">
			<p class="absolute -top-3 bg-purple-600 text-white font-bold text-base px-2 rounded-full">vedal987</p>
			<p>
				On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. 
			</p>
		</div>
		<div class="mt-4 mb-1 relative text-white bg-purple-950 p-2 pt-4 text-sm rounded-md border-purple-400 border-2">
			<Icon icon="ph:sparkle-fill" class="absolute right-2 h-8 w-8 -top-4 border-purple-400 border-2 bg-purple-700 text-yellow-300 font-bold text-base p-1 rounded-full" />
			<p class="absolute -top-3 bg-purple-600 font-bold text-base px-2 rounded-full">vedal987</p>
			<p>
				Le Lorem Ipsum est simplement du faux texte.. 
			</p>
		</div>
	</div>
</main>
