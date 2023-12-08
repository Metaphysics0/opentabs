import { SearchService } from '$lib/server/services/search.service';
import { ParamsHelper } from '$lib/server/utils/paramsHelper';
import type { Actions } from '@sveltejs/kit';
import { RedisDal } from '../server/redis/dal';

export const actions: Actions = {
	search: async ({ request }) => {
		try {
			const formData = await request.formData();
			const searchQuery = new ParamsHelper().getRequiredFormDataParam<string>({
				formData,
				paramName: 'q',
				paramType: 'string'
			});

			const redisDal = new RedisDal();
			const cachedSearchResults = await redisDal.getSearchResultsFromSearchQuery(searchQuery);
			if (cachedSearchResults) {
				return {
					results: cachedSearchResults
				};
			}

			const searchResults = await new SearchService({ searchQuery }).call();
			await redisDal.setSearchResultsFromSearchQuery(searchQuery, searchResults);

			return {
				results: searchResults
			};
		} catch (error) {
			console.error('Search action failed:', error);
			return {
				results: []
			};
		}
	}
};
