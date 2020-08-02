<script>
	import formatNumber from "../helpers/formatNumber.js";
	export let invoice;

	const conceptos = invoice.Conceptos.concepto ? invoice.Conceptos.concepto : [invoice.Conceptos.Concepto];
</script>
<ul>
	{#each conceptos as concepto}
	<li>
		{concepto.cantidad} - 
		{concepto.descripcion} - 
		{formatNumber(concepto.importe,invoice.moneda)} 
	</li>
	{/each}
</ul>