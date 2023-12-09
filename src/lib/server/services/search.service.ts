import { GuitarProTabsNetRepository } from '../repositories/guitarProTabsNet.repository';
import { GuitarProTabsOrgRepository } from '../repositories/guitarProTabsOrg.repository';
import { SongsterrRepository } from '../repositories/songsterr.repository';
import { UltimateGuitarRepository } from '../repositories/ultimateGuitar.repository';

export class SearchService {
	private readonly searchQuery: string;
	constructor(
		{ searchQuery }: SearchServiceOptions,
		private readonly songsterrRepository = new SongsterrRepository(),
		private readonly ultimateGuitarRepository = new UltimateGuitarRepository(),
		private readonly guitarProTabsOrgRepository = new GuitarProTabsOrgRepository()
	) {
		this.searchQuery = searchQuery;
	}

	async call(): Promise<any> {
		try {
			const results = await Promise.all([
				this.fetchResultsFromRepository(this.songsterrRepository),
				this.fetchResultsFromRepository(this.ultimateGuitarRepository),
				this.fetchResultsFromRepository(this.guitarProTabsOrgRepository)
			]);

			return results.flat();
		} catch (error) {
			console.error('Fetching results failed', error);
			return [];
		}
	}

	private async fetchResultsFromRepository(repository: ResourceRepository) {
		try {
			return repository.search(this.searchQuery);
		} catch (error) {
			console.error(`Fetching results from repository failed.`, error);
			return [];
		}
	}
}
export interface SearchServiceOptions {
	searchQuery: string;
}
