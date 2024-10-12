<script lang="ts">
    import Icon from '@iconify/svelte';
    import { type TchatProps } from './tchat';
	import { slide } from 'svelte/transition';

    let props : TchatProps = $props();

    let maxMessages = $derived(props.maxMessages !== undefined ? props.maxMessages : 5);
</script>

<div
	class="border-2 border-cyan-500 p-4 rounded-xl flex flex-col justify-center items-stretch w-[28rem]"
>
    {#each props.messages.slice(Math.max(props.messages.length - maxMessages, 0)) as message}
        <div
            out:slide={{duration: 200}}
            class="mt-4 mb-1 relative text-white bg-cyan-950 p-2 pt-4 text-sm rounded-md border-cyan-400 border-2"
        >
            <p class="absolute -top-3 bg-cyan-600 text-white font-bold text-base px-2 rounded-full">
                {message.author}
            </p>
            <p>
                {message.content}
            </p>
        </div>
    {/each}
</div>
