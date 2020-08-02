<script>
/*import Select from 'svelte-select';*/
import AutoComplete from "simple-svelte-autocomplete";
import Item from './EntityItem.svelte'
export let entities;

export let selectedEntity = undefined;

const items = entities.map(e => ({label:e.nombre.toUpperCase(),value:e.rfc}));

</script>

<!-- <Select items={items} bind:selectedEntity  ></Select> -->
<AutoComplete selectedItem items="{entities}" labelFieldName='nombre' minChar="1" />