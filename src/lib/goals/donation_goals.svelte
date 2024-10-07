<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { DonationGoal, DonationGoalRotator } from './donation_goals';
	import { eurFormatBigInt, eurNoCentsFormatBigInt } from '$lib/util';
	import { fade, slide } from 'svelte/transition';

	let props: DonationGoalRotator = $props();
	let currentGoal = $state(0);

	const shownGoals = props.shownGoals ?? 3;

	$effect(() => {
		if (props.goals == undefined || props.goals.length == 0) {
			return;
		}
		if (currentGoal < props.goals.length && props.value >= props.goals[currentGoal].goal) {
			if (props.goalAchieved !== undefined) {
				props.goalAchieved(props.goals[currentGoal]);
			}
			if (props.goals.length > currentGoal) {
				currentGoal++;
			}
		}
	});

	/// Returns the target value of the current goal
	function getGoalValue(): bigint {
		if (props.goals == undefined) {
			return 0n;
		}
        if (currentGoal >= props.goals.length) {
            return props.goals[props.goals.length - 1].goal;
        }
		return props.goals[currentGoal].goal;
	}

	/// Returns the position of the progress bar in percentage
	/// 0% if no goal is defined or if the current goal is not reached
	/// 100% if the current goal is reached
	/// Otherwise, the percentage of the current goal reached
	function getPosition(): number {
		const a = Math.floor((Number(props.value) / Number(getGoalValue())) * 100);
		return Math.min(Math.max(0, a), 100);
	}

	/// Returns the indexes of the shown goals
	function getShownGoals(): number[] {
		let goals = [];
        let goal = Math.min(currentGoal, props.goals.length - 1);        
		// Show the current goal and the previous one
		goals.push(goal);
		if (goal > 0) {
			goals.push(goal - 1);
		}
		// If the number of shown goals is greater than 2, show the next ones
		let i = 1;
		while (goals.length < shownGoals && goal + i < props.goals.length) {
			goals.push(goal + i);
			i++;
		}
		// If the number of shown goals is greater than 2, and the next goals are
		// exhausted, show the previous ones
		i = 2;
		while (goals.length < shownGoals && goal - i >= 0) {
			goals.push(goal - i);
			i++;
		}
		return goals;
	}
</script>

<div class="mt-8 p-4 border-2 border-cyan-500 rounded-xl flex flex-col justify-stretch">
	<h2 class="text-xl font-bold text-cyan-500 uppercase">Donation goals</h2>
	<div class="relative gap-2 bg-slate-800 rounded-2xl mb-2">
		<div class="absolute left-0 ml-4 text-cyan-50">
			<p class="font-bold">{eurFormatBigInt(props.value)} / {eurFormatBigInt(getGoalValue())}</p>
		</div>
		<div style="width: {getPosition()}%">
			<div class="bg-cyan-500 h-6 rounded-2xl"></div>
		</div>
	</div>

	<div class="flex flex-col gap-y-2 text-sm">
		{#each props.goals as goal, index}
			{#if getShownGoals().includes(index)}
				<div class="relative pb-1"
					transition:slide={{ delay: 300, duration: 700 }}
				>
					<div class="h-4 w-4 rounded-full absolute top-1 left-4 mt-0.5"
						class:bg-cyan-400={index >= currentGoal}
						class:bg-lime-400={index < currentGoal}
					></div>
					<div class="px-2 py-1 absolute left-2 top-2 -rotate-12 rounded-lg font-semibold text-sm"
						class:bg-cyan-400={index >= currentGoal}
						class:bg-lime-400={index < currentGoal}
					>
						<p>{eurNoCentsFormatBigInt(goal.goal)}</p>
					</div>
					<div class="flex flex-row px-4 py-2 transition-shadow rounded-lg bg-slate-800 text-xs font-semibold uppercase text-slate-50 items-center"
						class:achieved-glow={index < currentGoal}>
						<p class="mx-3 invisible">{eurNoCentsFormatBigInt(goal.goal)}</p>
						{#if index == currentGoal}
						<div transition:slide={{duration:250, axis: 'x'}} class="inline-flex mt-0.5">
						<div class="animated-color"><Icon icon="weui:arrow-filled" class="-ml-2 mr-1 w-4 h-4"></Icon></div>
						<div class="animated-color2"><Icon icon="weui:arrow-filled" class="-ml-2 mr-1 w-4 h-4"></Icon></div>
						</div>
						{/if}
						<p>{goal.title}</p>
					</div>
				</div>
			{/if}
		{/each}
		
		{#if currentGoal + shownGoals < props.goals.length}
			<div class="text-cyan-400">
				<p class="font-semibold text-xs">et plus encore...</p>
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes anim1 {
		from {
			color: violet;
		}
		50% {
			color: hsl(189, 100%, 83%);
		}
		to {
			color: violet;
		}
	}

	.animated-color {
		animation: 2s anim1 infinite;
	}

	.animated-color2 {
		animation: 2s anim1 infinite;
		animation-delay: 1s;
	}

	.achieved-glow {
		box-shadow: 0px 0px 4px 2px rgba(216, 255, 45, 0.65);
	}
</style>