<script lang="ts">
	import Icon from '@iconify/svelte';

	export let withActiveSearch: boolean = false;

	const placeholderTextMap = {
		noResultsFound: {
			header: 'No matching results',
			subHeader: 'Check the spelling, or try changing the filters',
			icon: 'mdi:guitar-pick-outline'
		},
		makeASearch: {
			header: 'No active search',
			subHeader: 'Type to start a search',
			icon: 'material-symbols:search'
		}
	};

	const textContent = withActiveSearch
		? placeholderTextMap.noResultsFound
		: placeholderTextMap.makeASearch;
</script>

<div class="text-4xl w-fit mx-auto text-center flex flex-col items-center mt-10">
	<Icon icon={textContent.icon} class="text-5xl mb-1 opacity-60" />
	<p class="mb-1 opacity-60">{textContent.header}</p>
	<p class="text-2xl opacity-50">{textContent.subHeader}</p>
</div>
