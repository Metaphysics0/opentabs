<script lang="ts">
	import DownloadButton from '../buttons/DownloadButton.svelte';
	import VisitPageButton from '../buttons/VisitPageButton.svelte';
	import OriginTooltip from '../common/tooltips/OriginTooltip.svelte';

	export let searchResult: SearchResult;
</script>

<div class="text-xl flex items-end justify-between rounded-md shadow p-3 my-3">
	<div class="flex">
		<p>
			<strong class="font-medium">
				{searchResult.songTitle}
			</strong>
			<span class="mx-1 font-light text-slate-700"> by </span>
			<strong class="font-medium">
				{searchResult.artistName}
			</strong>
		</p>
		<p class="text-lg"></p>
	</div>
	<div class="flex items-center">
		<OriginTooltip {searchResult} />
		{#if searchResult.origin === 'guitar-pro-tabs-org'}
			<VisitPageButton {searchResult} />
		{:else}
			<DownloadButton {searchResult} />
		{/if}
	</div>
</div>
