import Scraper from '../utils/scraper';

export abstract class BaseRepository {
	constructor(protected scraper = new Scraper()) {}

	isValidSearchResult(searchResult: any) {
		const knownInvalidProperties = ['undefineddownload', 'adsbygoogle'];
		if (
			Object.values(searchResult).some(
				(val) =>
					knownInvalidProperties.findIndex((invalidProperty) =>
						String(val).includes(invalidProperty)
					) !== -1
			)
		) {
			return false;
		}

		return true;
	}

	protected logSearchError(error: any) {
		const className = this.constructor.name;
		console.error(`${className} search failure`, error);
	}
}
