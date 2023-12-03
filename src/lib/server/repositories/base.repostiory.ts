import Scraper from '../utils/scraper';

export abstract class BaseRepository {
	constructor(protected scraper = new Scraper()) {}

	protected logSearchError(error: any) {
		const className = this.constructor.name;
		console.error(`${className} search failure`, error);
	}
}
