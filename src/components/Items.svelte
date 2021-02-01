<script>
  //import { slide } from 'svelte/transition';
  import formatNumber from "../helpers/FormatNumber.js";
  export let invoice;
  const conceptos = invoice.Conceptos.concepto ? invoice.Conceptos.concepto : [invoice.Conceptos.Concepto];
  const minItems = 3;
  $: seemore = conceptos.length >= minItems;
  function toggleSeemore() {
    seemore = !seemore;
  }
</script>
<ul>
  {#each conceptos as concepto, i}
    {#if i < minItems || !seemore && i>= minItems }
      <li >
        {concepto.cantidad} - 
        {concepto.descripcion} - 
        {formatNumber(concepto.importe,invoice.moneda)} 
      </li>
    {/if}
  {/each}
</ul>

{#if conceptos.length > minItems}
<button on:click={toggleSeemore}>
  <span>Ver {seemore?'más':'menos'}</span>
  <span class="material-icons">
    {seemore?'keyboard_arrow_down':'keyboard_arrow_up'}
  </span>
</button>
{/if}

<style>
  ul{
    font-size: .9em;
    list-style: outside;
    margin: 0;
    padding: 5px 5px 5px 45px;
  }
  li{
    padding-left: 25px;
  }
  button{
    border: 0 none;
    color: #28bee6;
    display: block;
    margin: -10px auto;
    padding: 10px 20px;
    background-color: transparent!important;
    text-transform: uppercase;
    font-size: .7em;
    font-weight: bold;
    cursor: pointer;
  }
  button span{
    display: inline-block;
    vertical-align: middle;
  }
</style>