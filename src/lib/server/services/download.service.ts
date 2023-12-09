import { DOWNLOAD_API_HOST } from '$env/static/private';
import type { SongsterrDownloadParams, UltimateGuitarDownloadParams } from '$lib/types/dtos';
import { SupportedResources } from '$lib/types/enums';

export class DownloadService {
	searchResult: SearchResult;
	fetch: typeof fetch;

	constructor({ searchResult, fetchImp }: { searchResult: SearchResult; fetchImp?: typeof fetch }) {
		this.searchResult = searchResult;
		this.fetch = fetchImp || fetch;

		if (!this.SUPPORTED_SEARCH_RESULT_ORIGINS.includes(this.searchResult.origin)) {
			throw new Error(
				`Unable to download from search result: ${this.searchResult}. Not supported origin`
			);
		}
	}

	async download() {
		try {
			const response = await this.fetch(this.endpoint!, {
				method: 'POST',
				body: JSON.stringify(this.params)
			});
			return response.json();
		} catch (error) {
			console.error(`Error downloading: ${this.searchResult}`);
		}
	}

	private get params() {
		if (this.isSongsterr) {
			return {
				songId: this.searchResult.metadata.songId,
				songTitle: this.searchResult.songTitle,
				artist: this.searchResult.artistName,
				byLinkUrl: this.searchResult.originUrl
			} as SongsterrDownloadParams;
		}

		if (this.isUltimateGuitar) {
			return {
				byLinkUrl: this.searchResult.originUrl
			} as UltimateGuitarDownloadParams;
		}
		if (this.isGuitarProTabsOrg) {
			return {
				songTitle: this.searchResult.songTitle,
				originUrl: this.searchResult.originUrl
			};
		}
	}

	private get endpoint() {
		if (this.isSongsterr) return DOWNLOAD_API_HOST + '/bySearchResult';
		if (this.isUltimateGuitar) return DOWNLOAD_API_HOST + '/ultimate-guitar';
		if (this.isGuitarProTabsOrg) return DOWNLOAD_API_HOST + '/byDownloadLink';
	}

	private get isSongsterr() {
		return this.searchResult.origin === 'songsterr';
	}
	private get isUltimateGuitar() {
		return this.searchResult.origin === 'ultimate-guitar';
	}
	private get isGuitarProTabsOrg() {
		return this.searchResult.origin === 'guitar-pro-tabs-org';
	}

	private SUPPORTED_SEARCH_RESULT_ORIGINS = [
		String(SupportedResources.ULTIMATE_GUITAR),
		String(SupportedResources.SONGSTERR),
		String(SupportedResources.GUITAR_PRO_TABS_ORG)
	];
}
