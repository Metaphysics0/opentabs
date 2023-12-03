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
		private readonly guitarProTabsOrgRepository = new GuitarProTabsOrgRepository(),
		private readonly guitarProTabsNetRepository = new GuitarProTabsNetRepository()
	) {
		this.searchQuery = searchQuery;
	}

	async call(): Promise<any> {
		try {
			const songsterrResults = await this.fetchResultsFromRepository(this.songsterrRepository);
			const ultimateGuitarResults = await this.fetchResultsFromRepository(
				this.ultimateGuitarRepository
			);
			const guitarProOrgResults = await this.fetchResultsFromRepository(
				this.guitarProTabsOrgRepository
			);
			const guitarProNetResults = await this.fetchResultsFromRepository(
				this.guitarProTabsNetRepository
			);

			return {
				songsterrResults,
				ultimateGuitarResults,
				guitarProOrgResults,
				guitarProNetResults
			};
		} catch (error) {
			console.error('Fetching results failed', error);
			return {
				songsterrResults: [],
				ultimateGuitarResults: [],
				guitarProOrgResults: []
			};
		}
	}

	private async fetchResultsFromRepository(repository: ResourceRepository): Promise<any[]> {
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
