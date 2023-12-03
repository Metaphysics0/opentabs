interface ResourceRepository {
	search(query: string): Promise<SearchResult[]>;
}

enum SupportedResources {
	ULTIMATE_GUITAR = 'ultimate-guitar',
	SONGSTERR = 'songsterr',
	GUITAR_PRO_TABS_NET = 'guitar-pro-tabs-net',
	GUITAR_PRO_TABS_ORG = 'guitar-pro-tabs-org'
}
interface SearchResult {
	songTitle: string;
	artistName: string;
	originUrl: string;
	origin: SupportedResources;
	metadata?: any;
}
