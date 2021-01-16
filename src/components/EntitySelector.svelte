<script>
  /*import Select from 'svelte-select';*/
  import AutoComplete from "simple-svelte-autocomplete";
  import Item from './EntityItem.svelte'
  export let entities;
  export let onChange;
  export let initValue;
  export let placeholder;
  export let selectedEntity = undefined;

  if (initValue) {
    selectedEntity = entities.find(e => e.id === initValue);
  }
</script>

<div class='row'>
  <AutoComplete className='custom-autocomplete' onChange={onChange} bind:selectedItem={selectedEntity}
    items="{entities}" labelFieldName='nombre' minCharactersToSearch="1" valueFieldName="id" placeholder={placeholder} />
  <div class=search-label>
    <i class="material-icons">search</i>
  </div>
</div>
<style>
  .row {
    display: flex;
  }

  .search-label {
    display: flex;
    align-items: center;
    padding: 0 15px;
    background-color: #61baff;
    border: 1px solid #61baff;
  }

  :global(.custom-autocomplete) {
    max-height: 51px;
    flex: 1;
  }

  :global(.custom-autocomplete .autocomplete-list) {
    background-color: #000 !important;
    color: #61baff !important;
    border: 1px solid #28bee6 !important;
    padding: 15px !important;
  }

  :global(.custom-autocomplete .autocomplete-list-item) {
    color: #61baff !important;
    background-color: transparent !important;
  }

  :global(.custom-autocomplete .autocomplete-list-item:hover) {
    color: #fff !important;
    background-color: transparent !important;
  }

  :global(.custom-autocomplete input) {
    color: #969696 !important;
    padding: 15px 22px !important;
    font-size: 1m !important;
    border-radius: 0 !important;
  }
</style>