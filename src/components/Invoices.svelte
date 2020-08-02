<script>
	import Items from './Items.svelte';
	import formatNumber from "../helpers/formatNumber.js";
	export let invoices;

</script>

{#each invoices as invoice}
	<article>
		<h3>{invoice.Emisor.nombre} - {invoice.Receptor.nombre}</h3>
		<h4>{formatNumber(invoice.total,invoice.moneda)}</h4>
		<p><strong>Fecha: </strong>{new Date(invoice.fecha).toLocaleDateString()}</p>
		
		<p><strong>Conceptos</strong></p>
		<Items invoice={invoice} ></Items>		
	</article>
{/each}

<style>
	article{
		background-color: #eee;
		padding:10px 20px;
		margin:10px 0;
	}
	h3{
		margin:10px 0;
		font-size: 1em;
		font-weight:100;
	}
</style>