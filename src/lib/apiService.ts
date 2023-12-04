import { pick } from 'lodash-es';

export const apiService = {
	download: {
		fromSongsterr: async (params: SongsterrDownloadParams): Promise<any> => {
			return fetchAndReturnJson({
				endpoint: 'download/songsterr',
				method: 'POST',
				params
			});
		}
	}
};

const fetchAndReturnJson = async (args: IMakeApiArgs) => (await make(args)).json();

function make({ endpoint, method, params }: IMakeApiArgs): Promise<Response> {
	let url = `/api/v1/${endpoint}`;
	if (method === 'GET' && params) {
		url += '?' + new URLSearchParams(params as string).toString();
	}

	const options = {
		method,
		headers: {
			'content-type': 'application/json'
		}
	};
	const body = method !== 'GET' && params ? JSON.stringify(params) : null;
	return fetch(url, body ? { ...options, body } : options);
}

interface IMakeApiArgs {
	endpoint: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
	params?: unknown;
	isFullUrl?: boolean;
}

interface SongsterrDownloadParams {
	songId: string;
	songTitle: string;
	artist: string;
}
