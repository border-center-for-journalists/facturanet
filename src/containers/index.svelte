<script>
  import Invoices from '../components/Invoices.svelte';
  import Filters from '../components/filters.svelte';
  import Pagination from '../components/pagination.svelte';
  import fetchNode from "../helpers/FetchNode.js";
  import {InvoiceQuery} from "../store.js";

  let page = 1;
  let limit = 30;
  let sort = 'total';
  let loadMore = true;
  let loading = false;
  let queryParams;
  
  InvoiceQuery.subscribe(v => queryParams = v);
  
  $: params = {
    ...queryParams,
    sort: sort+' DESC',
    limit,
    skip: (page-1) * limit
  };

  $: invoiceRequest = fetchNode('invoice',params);
  $: countRequest = fetchNode('invoice/count',{where:JSON.stringify(queryParams)});
</script>
<main>
  <Filters urlParams={queryParams}  />
  {#await countRequest then count}
    <Pagination count={count} limit={limit} bind:page />
  {/await}
  {#await invoiceRequest}
    <p class='loadMore'>Cargando ...</p>
  {:then invoices}
    <Invoices invoices={invoices} />
  {/await}
 
</main>

<style>

  .loadMore{
    text-align: center;
    padding: 15px;
    font-size: 1em;
    color: #61baff;
  }

</style>