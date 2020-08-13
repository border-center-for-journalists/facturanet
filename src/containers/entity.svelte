<script>
  import { onMount } from 'svelte';
  import SvelteInfiniteScroll from "svelte-infinite-scroll";
  import Invoices from '../components/Invoices.svelte';
  import fetchNode from "../helpers/FetchNode.js";
  import formatNumber from "../helpers/FormatNumber.js";

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
{#if entity}
  <h1>{entity.nombre} - {entityType}</h1>
  {#if amounts}
    {#if amounts.result.totalsByEntityUSD.length > 0 }
      <h3>Numero de facturas {entityTypeText} (USD): {totalUSD.count}</h3>
      <h3>Total de facturas {entityTypeText} (USD): {formatNumber(totalUSD.total,'USD')}</h3>
      <div class='rows'>
        {#each amounts.result.totalsByEntityUSD as item }
          <div class='item'>
            <p>{item.entity.nombre}</p>
            <p><strong>Numero de facturas:</strong> {item.count}</p>
            <p><strong>Monto total:</strong> {formatNumber(item.total,'USD')}</p>
          </div>
        {/each}
      </div>
    {/if}
    
    {#if amounts.result.totalsByEntityMXN.length > 0 }
      <h3>Numero de facturas {entityTypeText} (MXN): {totalMXN.count}</h3>
      <h3>Total de facturas {entityTypeText} (MXN): {formatNumber(totalMXN.total,'MXN')}</h3>
      <div class='rows'>
        {#each amounts.result.totalsByEntityMXN as item }
          <div class='item'>
            <h4>{item.entity.nombre}</h4>
            <p><strong>Numero de facturas:</strong> {item.count}</p>
            <p><strong>Monto total:</strong> {formatNumber(item.total,'MXN')}</p>
          </div>
        {/each}
      </div>
    {/if}
  {/if}

{/if}

<style>
  .rows{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .item{
    flex:1 0 45%;
    max-width: 45%;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0px 0px 9px -5px #000;
    border-radius: 10px;
    background-color: #fff;
    margin: 10px 0;
  }
  .item p{
    margin: 0;
  }
  .item h4{
    margin: 0 0 15px 0;
  }
  @media (max-width: 800px) {
    .item{
      flex: 1;
      min-width: 100%;
    }
  }
</style>