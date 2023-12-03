/* eslint-disable @typescript-eslint/no-explicit-any */
import { GuitarProTabsOrgRepository } from '../repositories/guitarProTabsOrg.repository';
import { SongsterrRepository } from '../repositories/songsterr.repository';
import { UltimateGuitarRepository } from '../repositories/ultimateGuitar.repository';

export class SearchService {
	searchQuery: string;
	constructor(
		{ searchQuery }: SearchServiceOptions,
		private songsterrRepository = new SongsterrRepository(),
		private ultimateGuitarRepository = new UltimateGuitarRepository(),
		private guitarProOrgRepository = new GuitarProTabsOrgRepository()
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
				this.guitarProOrgRepository
			);

			return {
				songsterrResults,
				ultimateGuitarResults,
				guitarProOrgResults
			};
		} catch (error) {
			console.error('Fetching results failed', error);
			return {
				songsterrResults: [],
				ultimateGuitarResults: []
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
