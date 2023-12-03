import { SearchService } from '$lib/server/services/search.service';
import { ParamsHelper } from '$lib/server/utils/paramsHelper';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	search: async ({ request }) => {
		const formData = await request.formData();
		const searchQuery = new ParamsHelper().getRequiredFormDataParam<string>({
			formData,
			paramName: 'q',
			paramType: 'string'
		});

		return {
			results: await new SearchService({ searchQuery }).call()
		};
	}
};
