<script>
  import queryString from "query-string";
  import SvelteInfiniteScroll from "svelte-infinite-scroll";
  import Invoices from '../components/Invoices.svelte';
  import EntitySelector from '../components/EntitySelector.svelte';
  import Filters from '../components/filters.svelte'
  import fetchNode from "../helpers/FetchNode.js";

  let page = 0;
  let limit = 10;
  let loadMore = true;
  let loading = false;
  let windowLocation = (typeof window !== 'undefined') ? window.location.search : '';
  let queryParams = queryString.parse(windowLocation);
  $: invoiceFetch = [];

  function handleFilterChange() {
    if (loading) return;
    windowLocation = (typeof window !== 'undefined') ? window.location.search : '';
    queryParams = queryString.parse(windowLocation);
    invoiceFetch = [];
    page = 0;
    loadMore = true;
    getInvoices(page);
  }

  async function getInvoices(p) {
    if (loading) return;
    loading = true;
    let filter = {}
    if (queryParams.receptor) {
      filter.receptor = queryParams.receptor;
    }
    if (queryParams.emisor) {
      filter.emisor = queryParams.emisor;
    }
    const params = {
      ...filter,
      sort: 'total DESC',
      limit,
      skip: p * limit
    }
    const invoiceResult = await fetchNode('invoice', params);
    if (invoiceResult.length === 0) loadMore = false;
    invoiceFetch = invoiceFetch.concat(invoiceResult);
    setTimeout(function () { loading = false }, 500);
  }
  function nextPage() {
    if (loading || !loadMore || invoiceFetch.length === 0) return;
    page += 1;
    getInvoices(page);
  }
	// $: recipientFetch = fetchNode('entity', {recipient: 1 ,  limit: 50, sort: 'nombre ASC'} );
</script>

<main>
  <Filters urlParams={queryParams} getInvoices={handleFilterChange} />
  <Invoices invoices={invoiceFetch} />
  <SvelteInfiniteScroll window threshold={100} on:loadMore={nextPage} />
  {#if loadMore}
    <p class='loadMore'>Cargar mas elementos.</p>
  {:else}
    <p class='loadMore'>No exiten mas elementos.</p>
  {/if}
</main>

<style>
  .loadMore{
    text-align: center;
    padding: 15px;
    font-size: 1em;
    color: #61baff;
  }
</style>