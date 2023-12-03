import { JSDOM } from 'jsdom';
export class ScraperService {
	async convertResponseTextToDocument(response: Response, withLog?: boolean) {
		try {
			const text = await response.text();
			if (withLog) {
				console.log('text', text);
			}

			return new JSDOM(text).window.document;
		} catch (error) {
			console.error('scraper service failed', error);
			throw new Error('Scraper Service failed');
		}
	}
}
