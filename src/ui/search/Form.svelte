<script lang="ts">
	import { enhance } from '$app/forms';
	import { mockData } from '$lib/constants/mockData';
	import { MINIMUM_CHARATCERS_FOR_SEARCH } from '$lib/constants/search';
	import { HtmlInputUtils } from '$lib/utils/html-input';
	import ResultsFoundText from './ResultsFoundText.svelte';
	import SearchResultItem from './SearchResultItem.svelte';
	const { debounce } = new HtmlInputUtils();

	let searchResults: SearchResult[] = [];
	let searchQuery: string;

	const debounceThenSubmit = debounce((event: Event) => {
		event.preventDefault();
		const { value } = <HTMLTextAreaElement>event.target;
		searchQuery = value;

		if (value.length < MINIMUM_CHARATCERS_FOR_SEARCH) {
			return;
		}

		// form.submit();
	}, 150);

	function setSearchResults(formResult: any) {
		if (formResult?.data?.results) {
			searchResults = formResult.data.results;
		}
	}
</script>

<form
	method="POST"
	action="?/search"
	class="flex justify-around items-center mb-3"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		return async ({ result, update }) => {
			setSearchResults(result);
			await update({ reset: false });
		};
	}}
>
	<input
		class="input mr-4 text-xl block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
		type="text"
		name="q"
		required={true}
		placeholder="Metallica"
		on:keyup={debounceThenSubmit}
		minlength={MINIMUM_CHARATCERS_FOR_SEARCH}
		min={MINIMUM_CHARATCERS_FOR_SEARCH}
	/>

	<button
		type="submit"
		class="text-lg flex items-center w-fit h-full px-2 py-1 font-semibold p-2 rounded-lg shadow-md transition duration-75 cursor-pointer bg-red-500 hover:bg-red-400 text-white disabled:bg-slate-5 disabled:hover:bg-slate-6 disabled:hover:cursor-not-allowed"
	>
		<span class="mr-0.5">Search</span>
	</button>
</form>

{#if mockData.length}
	<ResultsFoundText {searchQuery} resultsCount={mockData.length} />
{/if}

{#each mockData as searchResult, index}
	<SearchResultItem {searchResult} {index} />
{/each}
