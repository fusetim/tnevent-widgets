<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { DonationGoal, DonationGoalRotator } from './donation_goals';
	import { eurFormatBigInt } from '$lib/util';
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

<div class="mt-8 p-4 border-2 border-purple-500 rounded-xl flex flex-col justify-stretch">
	<h2 class="text-xl font-bold text-purple-500 uppercase">Donation goals</h2>
	<div class="relative gap-2 bg-slate-800 rounded-2xl mb-2">
		<div class="absolute left-0 ml-4 text-purple-50">
			<p class="font-bold">{eurFormatBigInt(props.value)} / {eurFormatBigInt(getGoalValue())}</p>
		</div>
		<div style="width: {getPosition()}%">
			<div class="bg-purple-500 h-6 rounded-2xl"></div>
		</div>
	</div>

	<div class="flex flex-col gap-y-2 text-sm">
		{#each props.goals as goal, index}
			{#if getShownGoals().includes(index)}
				<div
					transition:slide={{ delay: 300, duration: 700 }}
					class:bg-slate-800={index >= currentGoal}
					class:bg-emerald-800={index < currentGoal}
					class="p-2 rounded-xl text-slate-100 flex flex-row justify-between items-center transition-colors"
				>
					<p
						class="font-bold transition-colors mr-4"
						class:text-emerald-200={index < currentGoal}
						class:text-purple-400={index >= currentGoal}
					>
						{eurFormatBigInt(goal.goal)}
					</p>
					<p class="font-semibold">{goal.title}</p>
					{#if index < currentGoal}
						<Icon icon="material-symbols:kid-star" class="text-emerald-200 h-6 w-6 ml-4" />
					{:else}
						<Icon
							icon={index % 2 ? 'ph:sparkle-fill' : 'fluent:sparkle-28-filled'}
							class="text-yellow-400 h-6 w-6 ml-4"
						/>
					{/if}
				</div>
			{/if}
		{/each}
		{#if currentGoal + shownGoals < props.goals.length}
			<div class="text-purple-400">
				<p class="font-semibold text-xs">et plus encore...</p>
			</div>
		{/if}
	</div>
</div>
