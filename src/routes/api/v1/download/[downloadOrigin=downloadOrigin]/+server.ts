import { DOWNLOAD_API_ENDPOINT } from '$env/static/private';
import { json, error, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, fetch }) => {
	try {
		const params = await request.json();
		const response = await fetch(DOWNLOAD_API_ENDPOINT, {
			method: 'POST',
			body: JSON.stringify(params)
		});
		const data = await response.json();

		return json(data);
	} catch (e) {
		console.error('Error downloading tab', e);
		return new Response(JSON.stringify({ error: 'Error downloading tab' }), { status: 500 });
	}
}) satisfies RequestHandler;
