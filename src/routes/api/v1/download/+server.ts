import { DownloadService } from '$lib/server/services/download.service';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, fetch }) => {
	try {
		const params = await request.json();
		const searchResult = params.searchResult as SearchResult;
		console.log('SEARCH RESULT FROM PARAM', searchResult);

		const downloadService = new DownloadService({ searchResult, fetchImp: fetch });
		const response = await downloadService.download();
		return json(response);
	} catch (e) {
		console.error('Error downloading tab', e);
		return new Response(JSON.stringify({ error: 'Error downloading tab' }), { status: 500 });
	}
}) satisfies RequestHandler;
