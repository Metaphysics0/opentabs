import type { ToastStore } from '@skeletonlabs/skeleton';

export class ToastService {
	toastStore: any;
	constructor(toastStore: ToastStore) {
		this.toastStore = toastStore;
	}

	toastError(msg: any): void {}
}
