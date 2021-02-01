<script>
  import { navigate } from "svelte-routing";
  import { InvoiceQuery } from "../store.js";
  import EntitySelector from './EntitySelector.svelte';
  import fetchNode from "../helpers/FetchNode.js";

  export let urlParams;
  let filters = [
    undefined,
    undefined,
  ];

  $: filtersObj = filters.reduce((r, f, i) => {
    if (f) {
      r[i === 0 ? 'receptor' : 'emisor'] = f.id;
    }
    return r;
  }, {})
  $: recipientFetch = fetchNode('entity', { recipient: 1, limit: 1000, sort: 'nombre ASC' });
  $: emmiterFetch = fetchNode('entity', { emmiter: 1, limit: 1000, sort: 'nombre ASC' });
  function onChange() {
    InvoiceQuery.navigate(filtersObj);
  }
</script>
<div class='filters'>
  {#await recipientFetch then recipients}
    <div class='item'>
      <p>
        Receptores
        {#if filters[0]}
        <button on:click={ () => filters[0] = undefined} >(Limpiar)</button>
        {/if}
      </p>
      <EntitySelector placeholder='Receptores' initValue={urlParams.receptor} onChange={onChange} entities="{recipients}" bind:selectedEntity={filters[0]} />
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
      <EntitySelector placeholder='Emisores' initValue={urlParams.emisor} onChange={onChange} entities="{emmiters}" bind:selectedEntity={filters[1]} />
    </div>
  {/await}
 <!--  <div class='checkbox'>
    <p><button on:click={() => sort = sort === 'total' ? 'fecha' : 'total' } >Ordenar por fecha  [{#if sort === 'fecha'}■{/if}]</button></p>
  </div> -->
</div>

<style>
  .checkbox{    
    padding-top:52px;
  }
  .checkbox p{
    margin: 5px 0;
  }
  .checkbox button{
    color: #61baff;
    background-color: transparent;
    border: none;
    margin-bottom: 0;
    cursor:pointer;
  }

  .filters{
    display: flex;
    margin: 0 -15px;
    flex-wrap: wrap;
    font-family: 'source code pro'
  }
  .item{
    padding: 0px 15px;
    width:50%;
    box-sizing: border-box;
  }
  .item button{
    background: transparent;
    border: 0 none;
    padding: 0;
    margin: 0;
    margin-left: 10px;
    font-size: .8em;
    color: #61baff;
    cursor: pointer;
    text-decoration: underline;
  }
  @media (max-width: 640px) {
    .item{
      width: 100%;
    }
  }
</style>