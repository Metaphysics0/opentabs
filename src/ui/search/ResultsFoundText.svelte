<script lang="ts">
	export let searchQuery: string;
	export let resultsCount: number;
</script>

<div class="text-xl">
	<strong>
		{resultsCount} results found
	</strong>
	for "{searchQuery}"
</div>
