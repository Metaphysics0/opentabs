import { sample } from 'lodash-es';
export default class Fetcher {
	userAgent: string;

	constructor() {
		this.userAgent = sample(this.userAgents) as string;
	}
	fetch(url: string) {
		return fetch(url, this.options);
	}

	async fetchAndReturnArrayBuffer(url: string) {
		const downloadResponse = await this.fetch(url);
		const buffer = await downloadResponse.arrayBuffer();
		return {
			downloadResponse,
			buffer,
			contentType: downloadResponse.headers.get('Content-Type')
		};
	}

	get options() {
		return {
			headers: this.headers
		};
	}

	private get headers() {
		return new Headers({
			'User-Agent': this.userAgent
		});
	}

	userAgents = [
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
		'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0',
		'Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0',
		'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:91.0) Gecko/20100101 Firefox/91.0',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0',
		'Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0'
	];
}
