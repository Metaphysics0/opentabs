export enum SupportedResources {
	ULTIMATE_GUITAR = 'ultimate-guitar',
	SONGSTERR = 'songsterr',
	GUITAR_PRO_TABS_NET = 'guitar-pro-tabs-net',
	GUITAR_PRO_TABS_ORG = 'guitar-pro-tabs-org'
}

export function humanizeResource(resource: SupportedResources): {
	label: string;
	website: string;
	value: string;
} {
	const resourceHumanizer = {
		[SupportedResources.ULTIMATE_GUITAR]: {
			label: 'Ultimate Guitar',
			website: 'https://ultimate-guitar.com'
		},
		[SupportedResources.SONGSTERR]: {
			label: 'Songsterr',
			website: 'https://songsterr.com'
		},
		[SupportedResources.GUITAR_PRO_TABS_NET]: {
			label: 'Guitar-Pro-Tabs.net',
			website: 'https://guitarprotabs.net'
		},
		[SupportedResources.GUITAR_PRO_TABS_ORG]: {
			label: 'Guitar-Pro-Tabs.org',
			website: 'https://guitarprotabs.org'
		}
	} as const;

	return { ...resourceHumanizer[resource], value: resource };
}
