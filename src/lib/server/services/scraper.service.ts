import { JSDOM } from 'jsdom';
export class ScraperService {
	async convertResponseTextToDomParser(response: Response) {
		const text = await response.text();
		const dom = new JSDOM(text);
	}
}
