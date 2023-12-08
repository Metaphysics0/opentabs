import { createHash } from 'node:crypto';
import { redis } from './client';
import { oneDayInSeconds } from '$lib/utils/date';
export class RedisDal {
	static SEARCH_RESULT_CACHE_KEY_PREFIX = 'CACHED_SEARCH_RESULT_';
	readonly SEARCH_RESULT_CACHE_DURATION = oneDayInSeconds * 3; // 3 day cache result

	async setSearchResultsFromSearchQuery(searchQuery: string, results: SearchResult[]) {
		const key = this.getKeyFromSearchQuery(searchQuery);
		await redis.set(key, JSON.stringify(results), { ex: this.SEARCH_RESULT_CACHE_DURATION });
	}

	async getSearchResultsFromSearchQuery(searchQuery: string): Promise<SearchResult[] | undefined> {
		const key = this.getKeyFromSearchQuery(searchQuery);
		const data = await redis.get<SearchResult[]>(key);
		if (data) {
			console.log(`Cache HIT from search query: ${searchQuery}`);
			return data;
		}
	}

	private getKeyFromSearchQuery(searchQuery: string) {
		const retKey = createHash('sha256').update(searchQuery).digest('hex');
		return RedisDal.SEARCH_RESULT_CACHE_KEY_PREFIX + retKey;
	}
}
