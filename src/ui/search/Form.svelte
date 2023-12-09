<script lang="ts">
	import { enhance } from '$app/forms';
	import { sampleSearchResults } from '$lib/constants/sampleSearchResults';
	import { MINIMUM_CHARATCERS_FOR_SEARCH } from '$lib/constants/search';
	import { searchResultsStore } from '../../stores/searchResults.store';
	import SearchResultItemSkeleton from '../skeletons/SearchResultItemSkeleton.svelte';
	import NoResultsPlaceholder from './NoResultsPlaceholder.svelte';
	import ResultsFoundText from './ResultsFoundText.svelte';
	import SearchResultItem from './SearchResultItem.svelte';
	import ShowResultsFromFilter from './filters/ShowResultsFromFilter.svelte';

	let searchQuery: string;
	let searchResults: SearchResult[];

	let noResultsReturned: boolean = false;
	let shouldShowResultsFoundText = false;
	let isSubmitting = false;

	searchResultsStore.subscribe((results) => {
		searchResults = results;
	});

	function setSearchResults(formResult: any) {
		isSubmitting = false;
		const results = formResult?.data?.results;
		searchQuery = formResult.data.searchQuery;
		if (results) {
			searchResultsStore.set(formResult.data.results);
			noResultsReturned = false;
			shouldShowResultsFoundText = true;
		}
		if (results.length === 0) {
			noResultsReturned = true;
			shouldShowResultsFoundText = false;
		}
	}
</script>

<form
	method="POST"
	action="?/search"
	class="flex flex-col w-full mb-5"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		isSubmitting = true;
		return async ({ result, update }) => {
			setSearchResults(result);
			await update({ reset: false });
		};
	}}
>
	<div class="flex mb-2.5 w-full items-center">
		<input
			class="input mr-4 text-xl block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
			type="text"
			name="q"
			required={true}
			placeholder="Playing God Polyphia"
			minlength={MINIMUM_CHARATCERS_FOR_SEARCH}
			min={MINIMUM_CHARATCERS_FOR_SEARCH}
		/>

		<button
			type="submit"
			class="text-lg flex items-center w-fit h-full px-2 py-1 font-semibold p-2 rounded-lg shadow-md transition duration-75 cursor-pointer bg-red-500 hover:bg-red-400 text-white disabled:bg-slate-5 disabled:hover:bg-slate-6 disabled:hover:cursor-not-allowed"
		>
			<span class="mr-0.5">Search</span>
		</button>
	</div>

	<div class="w-full flex justify-between">
		<strong class="mb-1 block"> Showing Results From: </strong>
		<ShowResultsFromFilter />
	</div>
</form>

{#if shouldShowResultsFoundText}
	<ResultsFoundText {searchQuery} resultsCount={searchResults.length} />
{/if}

{#if isSubmitting}
	{#each new Array(30).fill('_') as { }}
		<SearchResultItemSkeleton />
	{/each}
{/if}

{#if !isSubmitting && searchResults.length}
	{#each searchResults as searchResult}
		<SearchResultItem {searchResult} />
	{/each}
{/if}

{#if !searchResults.length}
	<NoResultsPlaceholder withActiveSearch={noResultsReturned} />
{/if}
