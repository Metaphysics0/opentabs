<script lang="ts">
	import { SupportedResources, humanizeResource } from '$lib/types/enums';

	const filterOptions = [SupportedResources.SONGSTERR, SupportedResources.ULTIMATE_GUITAR].map(
		humanizeResource
	);
</script>

<div class="flex justify-between">
	{#each filterOptions as filterOption}
		<label class="flex items-center space-x-2">
			<input class="checkbox" type="checkbox" value={filterOption.value} />
			<p>{filterOption.label}</p>
		</label>
	{/each}
</div>
