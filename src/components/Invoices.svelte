<script>
  import { Router, link } from "svelte-routing";
  import Items from './Items.svelte';
  import formatNumber from "../helpers/FormatNumber.js";
  import normalizeAddress from "../helpers/NormalizeAddress.js";
  export let invoices;
</script>
{#each invoices as invoice}
	<article>
    <div class='entities'>
    <Router>
      <div class='entity'>
  		  <h3><a target="_blank" href="/entity/{invoice.emisor}" use:link>{invoice.Emisor.nombre} </a></h3>
        <div class='address source-code'>
          <p><a href='https://www.google.com/search?q={invoice.Emisor.rfc}' target='_blank'>{invoice.Emisor.rfc}</a></p>
          {#if normalizeAddress(invoice.Emisor)}
            <p><a target='_blank' href='https://www.google.com/maps/search/?api=1&query={normalizeAddress(invoice.Emisor).query}'>
              {normalizeAddress(invoice.Emisor).line1} 
            </a></p>
            <p>{normalizeAddress(invoice.Emisor).line2}</p>
            <p>{normalizeAddress(invoice.Emisor).line3}</p>
          {/if}
        </div>
      </div>
      <div class='entity'>
        <h3><a target="_blank" href="/entity/{invoice.receptor}" use:link>{invoice.Receptor.nombre}</a></h3>
        <div class='address source-code'>          
          <p><a href='https://www.google.com/search?q={invoice.Receptor.rfc}' target='_blank'>{invoice.Receptor.rfc}</a></p>
          {#if normalizeAddress(invoice.Receptor)}
            <p><a target='_blank' href='https://www.google.com/maps/search/?api=1&query={normalizeAddress(invoice.Receptor).query}'>
              {normalizeAddress(invoice.Receptor).line1} 
            </a></p>
            <p>{normalizeAddress(invoice.Receptor).line2}</p>
            <p>{normalizeAddress(invoice.Receptor).line3}</p>
          {/if}
        </div>

      </div>
    </Router>
    </div>
    <hr />
		<h4 class='blue source-code'>{formatNumber(invoice.total,invoice.moneda)}</h4>
    <p class='blue'><strong class='source-code'>Fecha: </strong><span class='source-code'>{new Date(invoice.fecha).toLocaleDateString()}</span></p>
    <p class='blue source-code'><strong>Folio Fiscal: </strong>{invoice.uuid}</p>
		<hr />
		<p class='uppercase blue source-code'><strong>Conceptos</strong></p>
		<Items invoice={invoice} ></Items>		
	</article>
{/each}
<style>
  .entities{
    display: flex;
  }
  .entity{
    padding-left:20px;
    flex: 50%;
  }
  .entity:first-child{
    padding-right:20px;
    padding-left: 0px;
    border-right:1px solid #ddd;
  }
  .entity .address{
    line-height:1.09em;
    font-size: .9em;
  }
	article{
		padding:40px 30px;
    margin:30px 0;
    box-sizing: border-box;
    line-height: 1.5em;
  }
  article:nth-child(even) h3 a{
    color: #4c4c4c;
  }
  article:nth-child(odd) h3 a{
    color: #fff;
  }
  article:nth-child(odd) p a{
    color: #fff;
  }
  article:nth-child(even){
    background-color: #fff;
    color: #4c4c4c !important;
  }
  article:nth-child(odd){
    background-color: #000;
    color: #fff !important;
    border: 1px solid #28bee6;
  }
	h3{
		margin:0 0 10px;
		font-size: 1em;
    font-weight:bold;
    text-transform: uppercase;
  }
  h3 a,p a{
    color:black;
  }
  h4{
    margin: 0;
    font-size: 1em;
  }
  hr{
    border: 0 none;
    border-top: 1px solid #28bee6;
    margin: 20px 0;
  }
  p{
    margin: 0;
    font-size: .9em;
  }
  .blue{
    color: #28bee6;
  }
  .uppercase{
    text-transform: uppercase;
  }
</style>