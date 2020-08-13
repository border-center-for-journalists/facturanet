<script>
  import { onMount } from 'svelte';
  import SvelteInfiniteScroll from "svelte-infinite-scroll";
  import Invoices from '../components/Invoices.svelte';
  import fetchNode from "../helpers/FetchNode.js";
  import formatNumber from "../helpers/FormatNumber.js";
  import EntitiesResume from '../components/EntitiesResume.svelte';

  export let id;
  let page = 0;
  let loadMore = true;
  let loading = false;
  const limit = 10;
  let entity;
  let amounts;
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
    console.log('amounts', amounts);
  });

</script>

<main>
  {#if entity}
    <h1>{entity.nombre} - {entityType}</h1>
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
  {/if}
</main>

<style>
  .blue{
    color: #28bee6;
  }
</style>