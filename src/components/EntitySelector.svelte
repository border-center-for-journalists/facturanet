<script>
  /*import Select from 'svelte-select';*/
  import AutoComplete from "simple-svelte-autocomplete";
  import Item from './EntityItem.svelte'
  export let entities;
  export let onChange;
  export let initValue;

  export let selectedEntity = undefined;

  // const items = entities.map(e => ({ label: e.nombre.toUpperCase(), value: e.rfc }));
  // console.log('asdsada', initValue, selectedEntity)
  if (initValue) {
    selectedEntity = entities.find(e => e.id === initValue);
    // console.log('asdsada', selectedEntity)
  }
</script>

<!-- <Select items={items} bind:selectedEntity  ></Select> -->
<AutoComplete className='custom-autocomplete' onChange={onChange} bind:selectedItem={selectedEntity} items="{entities}"
  labelFieldName='nombre' minCharactersToSearch="1" valueFieldName="id" />

<style>
  :global(.custom-autocomplete) {
    max-height: 35px;
  }
</style>