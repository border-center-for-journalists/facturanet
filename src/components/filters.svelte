<script>
  import EntitySelector from './EntitySelector.svelte';
  import fetchNode from "../helpers/FetchNode.js";

  export let getInvoices;
  let filters = [undefined, undefined];
  $: filtersObj = filters.reduce((r, f, i) => {
    if (f) {
      r[i === 0 ? 'receptor' : 'emisor'] = f.id;
    }
    return r;
  }, {})
  $: recipientFetch = fetchNode('entity', { recipient: 1, limit: 1000, sort: 'nombre ASC' });
  $: emmiterFetch = fetchNode('entity', { emmiter: 1, limit: 1000, sort: 'nombre ASC' });
  function onChange() {
    getInvoices(filtersObj)
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
        <EntitySelector onChange={onChange} entities="{recipients}" bind:selectedEntity={filters[0]} />
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
        <EntitySelector onChange={onChange} entities="{emmiters}" bind:selectedEntity={filters[1]} />
      </p>
    </div>
  {/await}
</div>

<style>
  .filters{
    display: flex;
    margin: 0 -15px;
  }
  .item{
    padding: 10px 15px;
    width: 40%;
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
</style>