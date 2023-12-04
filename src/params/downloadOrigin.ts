import { SupportedResources } from '$lib/types/enums';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string) => {
	return (Object.values(SupportedResources) as ReadonlyArray<string>).includes(param);
};
