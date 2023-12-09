<script lang="ts">
	import type { CssClasses } from '@skeletonlabs/skeleton';
	import { sample } from 'lodash-es';

	function getRandomWidth(): string {
		const options: CssClasses[] = ['w-2/3', 'w-1/2', 'w-1/4', 'w-1/5', 'w-2/5'];

		return sample(options) as string;
	}
</script>

<div class="text-xl flex items-end justify-between rounded-md shadow p-3 my-3">
	<div class="flex items-center my-auto w-1/2">
		<div class={`placeholder h-2.5 ${getRandomWidth()} my-auto mr-3 animate-pulse`} />
		<div class={`placeholder h-2.5 ${getRandomWidth()} my-auto animate-pulse`} />
	</div>
	<div class="flex items-center">
		<div class="placeholder-circle w-5 mr-10 animate-pulse" />
		<div class="placeholder-circle w-10 animate-pulse" />
	</div>
</div>
