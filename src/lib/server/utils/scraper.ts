import { JSDOM } from 'jsdom';
import { sample } from 'lodash-es';
export default class Scraper {
	async fetchAndGetDocument(url: string) {
		const response = await this.fetchWithRandomUserAgent(url);
		return this.convertResponseTextToDocument(response);
	}

	async convertResponseTextToDocument(response: Response) {
		try {
			const text = await response.text();
			return new JSDOM(text).window.document;
		} catch (error) {
			console.error('scraper service failed', error);
			throw new Error('Failed converting response text to document');
		}
	}

	async fetchWithRandomUserAgent(url: string) {
		return fetch(url, {
			headers: new Headers({
				'User-Agent': sample(this.userAgents) as string
			})
		});
	}

	private userAgents = [
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
