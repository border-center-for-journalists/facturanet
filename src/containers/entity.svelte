<script>
  import { onMount } from 'svelte';
  import SvelteInfiniteScroll from "svelte-infinite-scroll";
  import Invoices from '../components/Invoices.svelte';
  import fetchNode from "../helpers/FetchNode.js";

  export let id;
  let page = 0;
  let loadMore = true;
  let loading = false;
  const limit = 10;
  let entity;
  let invoiceFetch = [];
  $: entityType = entity ? entity.emmiter ? 'emisor' : 'receptor' : '';
  $: entityTypeText = entity ? entity.emmiter ? 'Emitidas' : 'Recibidas' : '';

  onMount(async () => {
    entity = await fetchNode(`entity/${id}`, {});
    getInvoices(0);
  });

  async function getInvoices(p) {
    if (loading) return;
    loading = true;
    let filter = {}
    if (entity.recipient) {
      filter.receptor = id;
    }
    if (entity.emmiter) {
      filter.emisor = id;
    }
    const params = {
      ...filter,
      sort: 'total DESC',
      limit,
      skip: p * limit
    }
    const invoiceResult = await fetchNode('invoice', params);
    if (invoiceResult.length === 0 || (page === 0 && invoiceResult.length < limit)) loadMore = false;
    invoiceFetch = invoiceFetch.concat(invoiceResult)

    console.log('RESULT', invoiceFetch, invoiceResult)
    setTimeout(function () { loading = false }, 500);
  }
  function nextPage() {
    if (loading || !loadMore || invoiceFetch.length === 0) return;
    page += 1;
    console.log('NEXT', page)
    getInvoices(page);
  }
</script>
{#if entity}
  <h1>{entity.nombre} - {entityType}</h1>
  <h3>Total de facturas {entityTypeText}: $xxx</h3>
  <Invoices invoices={invoiceFetch} />
  <SvelteInfiniteScroll window threshold={100} on:loadMore={()=> nextPage()} />
    {#if loadMore}
      <p>Cargar mas elementos.</p>
    {:else}
      <p>No exiten mas elementos.</p>
    {/if}
{/if}