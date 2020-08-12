<script>
  import { navigate } from "svelte-routing";
  import EntitySelector from './EntitySelector.svelte';
  import fetchNode from "../helpers/FetchNode.js";

  export let getInvoices;
  export let urlParams;
  let filters = [
    undefined,
    undefined,
  ];
  // console.log('PARAMS filter', urlParams, filters)

  $: filtersObj = filters.reduce((r, f, i) => {
    if (f) {
      r[i === 0 ? 'receptor' : 'emisor'] = f.id;
    }
    return r;
  }, {})
  $: recipientFetch = fetchNode('entity', { recipient: 1, limit: 1000, sort: 'nombre ASC' });
  $: emmiterFetch = fetchNode('entity', { emmiter: 1, limit: 1000, sort: 'nombre ASC' });
  function onChange() {
    let urlParams = filtersObj.receptor ? `?receptor=${filtersObj.receptor}` : '';
    urlParams += filtersObj.emisor ? `${(urlParams === '' ? '?' : '&')}emisor=${filtersObj.emisor}` : '';
    navigate(`/${urlParams}`, { replace: true });
    getInvoices();
  }
</script>
<div class='filters'>
  {#await recipientFetch then recipients}
    <div class='item'>
      <p>
        Receptores
        {#if filters[0]}
        <button on:click={ () => filters[0] = undefined } >(Limpiar)</button>
        {/if}
      </p>
      <p>
        <EntitySelector initValue={urlParams.receptor} onChange={onChange} entities="{recipients}" bind:selectedEntity={filters[0]} />
      </p>
    </div>
  {/await}
  {#await emmiterFetch then emmiters}
    <div class='item'>
      <p>
        Emisores
        {#if filters[1]}
        <button on:click={ () => filters[1] = undefined } >(Limpiar)</button>
        {/if}
      </p>
      <p>
        <EntitySelector initValue={urlParams.emisor} onChange={onChange} entities="{emmiters}" bind:selectedEntity={filters[1]} />
      </p>
    </div>
  {/await}
</div>

<style>
  .filters{
    display: flex;
    margin: 0 -15px;
    flex-wrap: wrap;
  }
  .item{
    padding: 0px 15px;
    width: 50%;
    box-sizing: border-box;
  }
  .item button{
    background: transparent;
    border: 0 none;
    padding: 0;
    margin: 0;
    margin-left: 10px;
    font-size: .8em;
    color: red;
    cursor: pointer;
    text-decoration: underline;
  }
  @media (max-width: 640px) {
    .item{
      width: 100%;
    }
  }
</style>