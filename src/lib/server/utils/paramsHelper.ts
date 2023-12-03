import { isEmpty } from 'lodash-es';
export class ParamsHelper {
	getRequiredFormDataParam<T>({
		formData,
		paramName,
		paramType
	}: {
		formData: FormData;
		paramName: string;
		paramType: string;
	}): T {
		const paramValue = formData.get(paramName);

		if (isEmpty(paramValue) || typeof paramValue !== paramType) {
			console.error(`Invalid ${paramName} input`, paramValue);
			throw new Error(`${paramName} is invalid`);
		}

		return paramValue as T;
	}
}
