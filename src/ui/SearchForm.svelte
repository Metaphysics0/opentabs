<script lang="ts">
	import { enhance } from '$app/forms';

	async function search(event: Event) {
		try {
			const { value } = <HTMLTextAreaElement>event.target;
			console.log('value', value);
		} catch (error) {
			console.error('error', error);
		}
	}

	let searchResults = [];

	const debounceDurationInMs = 150;
	let timer: any;
	let isPromiseInProgress: boolean = false;
	const debounceThenSearch = (event: Event) => {
		const { value } = <HTMLTextAreaElement>event.target;
		clearTimeout(timer);
		if (value === '') {
			searchResults = [];
			return;
		}
		timer = setTimeout(() => {
			isPromiseInProgress = true;
			search(event);
		}, debounceDurationInMs);
	};
</script>

<form
	method="POST"
	action="?/search"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		// `formElement` is this `<form>` element
		// `formData` is its `FormData` object that's about to be submitted
		// `action` is the URL to which the form is posted
		// calling `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted

		return async ({ result, update }) => {
			console.log('RESULT', result);

			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
		};
	}}
>
	<label class="label">
		<span>Search!</span>
		<input class="input" type="text" name="q" placeholder="Search!" on:keyup={debounceThenSearch} />
	</label>
</form>
