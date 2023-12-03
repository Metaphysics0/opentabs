interface ResourceRepository {
	search(query: string): Promise<SearchResult[]>;
}

interface SearchResult {
	songTitle: string;
	artistName: string;
	originUrl: string;
	origin: 'ultimate-guitar' | 'songsterr' | 'guitar-pro-tabs-net' | 'guitar-pro-tabs-org';
	metadata?: any;
}
