<script lang="ts">
	import { SupportedResources } from '$lib/types/enums';
	const filterOptions = Object.values(SupportedResources);
</script>

<div class="space-y-2">
	{#each filterOptions as filterOption}
		<label class="flex items-center space-x-2">
			<input class="checkbox" type="checkbox" />
			<p>{filterOption}</p>
		</label>
	{/each}
</div>
