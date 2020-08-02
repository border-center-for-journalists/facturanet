<script>
	import Invoices from './components/Invoices.svelte';
	import EntitySelector from './components/EntitySelector.svelte';
	import fetchNode from "./helpers/FetchNode.js";

	$: selectedEntity = undefined;

	$: invoiceFetch = fetchNode('invoice', { sort : 'total DESC'} );
	$: recipientFetch = fetchNode('entity', {recipient: 1 ,  limit: 50, sort: 'nombre ASC'} );
</script>

<main>
	<h1>Facturanet</h1> 
	{#await recipientFetch then entities}
		<EntitySelector entities="{entities}" bind:selectedEntity />
	{/await}
	{#await invoiceFetch then invoices}
		<Invoices invoices={invoices} />
	{/await}
</main>

<style>
	main {
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #87255B;
		text-transform: uppercase;
		font-size: 2.8em;
		font-weight: 100;
		margin: 20px auto 30px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>