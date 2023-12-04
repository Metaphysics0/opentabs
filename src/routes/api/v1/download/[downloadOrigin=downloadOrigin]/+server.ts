import { DOWNLOAD_API_ENDPOINT } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, fetch }) => {
	const params = await request.json();
	const response = await fetch(DOWNLOAD_API_ENDPOINT, {
		method: 'POST',
		body: JSON.stringify(params)
	});
	const data = await response.json();
	return json(data);
}) satisfies RequestHandler;
