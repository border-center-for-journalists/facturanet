<script>
  import { Router, link } from "svelte-routing";
  import Items from './Items.svelte';
  import formatNumber from "../helpers/FormatNumber.js";
  export let invoices;
</script>
{#each invoices as invoice}
	<article>
		<h3>
      <Router>
        <a href="/entity/{invoice.emisor}" use:link> {invoice.Emisor.rfc} - {invoice.Emisor.nombre} </a> - 
        <a href="/entity/{invoice.receptor}" use:link> {invoice.Receptor.rfc} {invoice.Receptor.nombre} </a>
      </Router>
    </h3>
		<h4 class='blue'>{formatNumber(invoice.total,invoice.moneda)}</h4>
    <p class='blue'><strong>Fecha: </strong>{new Date(invoice.fecha).toLocaleDateString()}</p>
    <p class='blue'><strong>Folio Fiscal: </strong>{invoice.uuid}</p>
		<hr />
		<p class='uppercase blue'><strong>Conceptos</strong></p>
		<Items invoice={invoice} ></Items>		
	</article>
{/each}
<style>
	article{
		padding:40px 30px;
    margin:30px 0;
    box-sizing: border-box;
    line-height: 1.5em;
  }
  article:nth-child(even) > h3 > a{
    color: #4c4c4c;
  }
  article:nth-child(odd) > h3 > a{
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
		margin:0;
		font-size: 1em;
    font-weight:bold;
    text-transform: uppercase;
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