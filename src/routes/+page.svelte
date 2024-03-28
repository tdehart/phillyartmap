<script lang="ts">
	import { Dices } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/logo.webp';

	function goToRandomArtist() {
		const id = Math.floor(Math.random() * 559) + 1;
		goto(`/artist/${id}`);
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="h1">Philly Art Map</h1>
		<img class="rounded-full w-96 h-96" src={logo} alt="Philly Art Map Logo" />
		<button on:click={goToRandomArtist} type="button" class="btn variant-filled">
			<Dices />
			<span>Random Artist</span>
		</button>
	</div>
</div>
