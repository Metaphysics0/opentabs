import Scraper from '../utils/scraper';

export abstract class BaseRepository {
	constructor(protected scraper = new Scraper()) {}

	isValidSearchResult(searchResult: SearchResult): boolean {
		if (['undefined', undefined].includes(searchResult.artistName)) {
			return false;
		}
		return true;
	}

	protected logSearchError(error: any) {
		const className = this.constructor.name;
		console.error(`${className} search failure`, error);
	}
}
