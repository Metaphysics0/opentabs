import { sampleSearchResults } from '$lib/constants/sampleSearchResults';
import { writable } from 'svelte/store';

export const searchResultsStore = writable<SearchResult[]>(sampleSearchResults);
