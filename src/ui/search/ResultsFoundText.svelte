<script lang="ts">
	export let searchQuery: string = '';
	export let resultsCount: number;
</script>

<div>
	<strong>
		{resultsCount} results found
	</strong>
	for {searchQuery || 'search'}
</div>
