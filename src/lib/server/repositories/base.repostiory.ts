import { ScraperService } from '../services/scraper.service';
import Fetcher from '../utils/fetch';

export abstract class BaseRepository {
	constructor(
		protected fetcher = new Fetcher(),
		protected scraper = new ScraperService()
	) {}

	protected logSearchError(error: any) {
		const className = this.constructor.name;
		console.error(`${className} search failure`, error);
	}
}
