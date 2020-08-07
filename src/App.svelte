<script>
  import Invoices from './components/Invoices.svelte';
  import EntitySelector from './components/EntitySelector.svelte';
  import Filters from './components/filters.svelte'
  import fetchNode from "./helpers/FetchNode.js";

  // $: selectedEntity = undefined;
  // let filters = [undefined, undefined];

  // console.log('FILTERS', filters);

  let invoiceFetch = [];

  function getInvoices(filter) {
    const params = { ...filter, sort: 'total DESC' }
    invoiceFetch = fetchNode('invoice', params);
  }
	// $: recipientFetch = fetchNode('entity', {recipient: 1 ,  limit: 50, sort: 'nombre ASC'} );
</script>

<main>
  <h1>Facturanet</h1>
  <Filters getInvoices={getInvoices} />
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