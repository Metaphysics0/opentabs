<script lang="ts">
	import { SupportedResources, createInputPropertiesFromResource } from '$lib/types/enums';

	const filterOptions = [SupportedResources.SONGSTERR, SupportedResources.ULTIMATE_GUITAR]
		.map(createInputPropertiesFromResource)
		.map((filterOption) => ({ ...filterOption, checked: true }));
</script>

<div class="flex justify-between">
	{#each filterOptions as filterOption}
		<label class="flex items-center space-x-2 mx-4">
			<input
				class="checkbox disabled:opacity-30 cursor-not-allowed"
				type="checkbox"
				disabled={true}
				checked={!!filterOption.checked}
				value={filterOption.value}
			/>
			<p>{filterOption.label}</p>
		</label>
	{/each}
</div>
