import { SearchService } from '$lib/server/services/search.service';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	search: async ({ request }) => {
		const formData = await request.formData();
		const searchQuery = formData.get('q');
		if (!searchQuery || typeof searchQuery !== 'string') {
			console.error('invalid search query input', searchQuery);
			throw new Error('Search query is invalid');
		}
		const service = new SearchService({ searchQuery });
		const searchResults = await service.call();

		return {
			results: searchResults
		};
	}
};
