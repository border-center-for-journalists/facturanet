<script>
  import { onMount } from 'svelte';
  import SvelteInfiniteScroll from "svelte-infinite-scroll";
  import Invoices from '../components/Invoices.svelte';
  import fetchNode from "../helpers/FetchNode.js";
  import formatNumber from "../helpers/FormatNumber.js";
  import normalizeAddress from "../helpers/NormalizeAddress.js";
  import EntitiesResume from '../components/EntitiesResume.svelte';

  export let id;
  
  const limit = 10;
  
  let page = 0;
  let loadMore = true;
  let loading = false;
  let entity;
  let amounts;
  let address;
  
  $: entityType = entity ? entity.emmiter ? 'emisor' : 'receptor' : '';
  $: entityTypeText = entity ? entity.emmiter ? 'Emitidas' : 'Recibidas' : '';
  
  $: totalMXN = amounts ?
    amounts.result.totalsByEntityMXN.reduce(
      (t, e) => ({ total: t.total + e.total, count: t.count + e.count })
      , { total: 0, count: 0 })
    : 0;
  
  $: totalUSD = amounts ?
    amounts.result.totalsByEntityUSD.reduce(
      (t, e) => ({ total: t.total + e.total, count: t.count + e.count })
      , { total: 0, count: 0 })
    : 0;

  onMount(async () => {
    amounts = await fetchNode(`entity/amounts/${id}`, {});
    entity = await fetchNode(`entity/${id}`, {});
    address = normalizeAddress(entity);
  });

</script>

<main>
  {#if entity}
    <h1>{entity.nombre}</h1>
    <section class='address source-code'>
      <h3><a target='_blank' href='https://www.google.com/maps/search/?api=1&query={address.query}'> {address.line1} {address.int}</a></h3>
      <p>{address.line2}</p>
      <p>{address.line3}</p>
    </section>
    <section class='source-code'>
    {#if amounts}
      {#if amounts.result.totalsByEntityUSD.length > 0 }
        <h3>Numero de facturas {entityTypeText} (USD): <span class='blue'>{totalUSD.count}</span></h3>
        <h3>Total de facturas {entityTypeText} (USD): <span class='blue'>{formatNumber(totalUSD.total,'USD')}</span></h3>
        <EntitiesResume totalsByEntity={amounts.result.totalsByEntityUSD} currency='USD' />
      {/if}
      
      {#if amounts.result.totalsByEntityMXN.length > 0 }
        <h3>Numero de facturas {entityTypeText} (MXN): <span class='blue'>{totalMXN.count}</span></h3>
        <h3>Total de facturas {entityTypeText} (MXN): <span class='blue'>{formatNumber(totalMXN.total,'MXN')}</span></h3>
        <EntitiesResume totalsByEntity={amounts.result.totalsByEntityMXN} currency='MXN' />
      {/if}
    {/if}
    </section>
  {/if}
</main>

<style>
  h1{
    font-size:1.7em;

  }
  h3{
    margin-bottom:10px;
    font-size:1em;
  }
  h3 a{
    text-decoration: underline;
    color:white;
  }
  .blue{
    color: #28bee6;
  }
  .address p{
    margin:2px 0 ;
  }
</style>