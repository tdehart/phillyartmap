<script lang="ts">
	import { Dices } from 'lucide-svelte';
	import { goToRandomArtist } from '$lib/randomArtist';
	
  export let data;
	let top: HTMLElement;

	function onclick() {
		goToRandomArtist();
		top.scrollIntoView();
	}
</script>

<div
	class="container h-full mx-auto py-4 flex flex-col justify-center items-center"
	bind:this={top}
>
	<h2 class="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight py-4">
		{data.name}
	</h2>
	{#each data.art as piece}
		<figure class="flex flex-col my-4">
			<img class="rounded" src={piece.pictures[0].large.url} alt={piece.title} />
			<figcaption>
				<strong class="font-bold">{piece.title.display} (<em>{piece.years[0].year})</em>.</strong>
				Located on {piece.location.description} [{piece.location.latitude}, {piece.location.longitude}]
			</figcaption>
		</figure>
	{/each}

	<button {onclick} type="button" class="btn variant-filled mt-8">
		<Dices />
		<span>Random Artist</span>
	</button>
</div>
