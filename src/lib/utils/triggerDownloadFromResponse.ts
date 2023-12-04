import { browser } from '$app/environment';

export function triggerDownloadFromResponse(res: any): void {
	if (!browser) return;

	try {
		const uint8Array = new Uint8Array(res.file);
		const blob = new Blob([uint8Array], { type: res.contentType });
		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = res.fileName;
		link.click();
	} catch (error) {
		console.error('Error triggering download', error);
	}
}
