<script lang="ts">
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let searchResult: SearchResult;
	export let index: number;

	const iconMap = {
		songsterr: '/assets/songsterr-logo.svg',
		'ultimate-guitar': '/assets/ultimate-guitar-logo.svg',
		'guitar-pro-tabs-net': '/',
		'guitar-pro-tabs-org': '/'
	};

	const originTooltip: PopupSettings = {
		event: 'hover',
		target: `originTooltip-${index}`,
		placement: 'top'
	};

	const metadataTooltip: PopupSettings = {
		event: 'hover',
		target: `metadataTooltip-${index}`,
		placement: 'top'
	};
</script>

<div class="text-xl flex items-end justify-between rounded-md shadow p-3 my-3">
	<div class="flex">
		<p>
			<strong class="font-medium">
				{searchResult.songTitle},
			</strong>
			<span class="mx-1 font-light text-slate-700"> by </span>
			<strong class="font-medium">
				{searchResult.artistName}
			</strong>
		</p>
		<p class="text-lg"></p>
	</div>
	<div class="flex items-center">
		<img
			use:popup={originTooltip}
			class="opacity-50"
			width="25"
			height="25"
			src={iconMap[searchResult.origin]}
			alt={searchResult.origin + ' logo'}
		/>
		<div use:popup={metadataTooltip}>
			<Icon class="mx-10" icon="material-symbols:info-outline" />
		</div>
		<button class="btn-icon bg-blue-400 text-white text-2xl">
			<Icon icon="material-symbols:download" />
		</button>
	</div>
</div>

<!-- origin tooltip -->
<div class="card p-4 variant-filled-secondary" data-popup={originTooltip.target}>
	<p>{searchResult.origin}</p>
	<div class="arrow variant-filled-secondary" />
</div>

<!-- metadata toolitp -->
<div class="card p-4 variant-filled-secondary" data-popup={metadataTooltip.target}>
	Origin: <a href={searchResult.origin} target="_blank">{searchResult.originUrl}</a>
	<div class="arrow variant-filled-secondary" />
</div>
