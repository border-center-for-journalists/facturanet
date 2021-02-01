<script>
	export let count;
	export let page;
	export let limit;

	let _page = page;
	
	$:page = restrict(_page,count,limit);

	function restrict(page,count,limit){
		if(page < 1) _page = 1;
		if(page > Math.ceil(count/limit)) _page = Math.ceil(count/limit);
		_page = _page > 0 ? _page : 1;
		return _page;
	}
</script>
  <div class='row'>
  	{#if count > 0}
	    <p>Pagina: {_page}</p>
	    <div class='controls'>
			<button on:click={() => _page++}>▲</button>
			<button on:click={() => _page--}>▼</button>
	  	</div>
	  	<p>Facturas: {(_page-1)*limit+1} - {_page*limit > count ? count : (_page*limit)} de {new Intl.NumberFormat('es-MX').format(count)}</p>
  	{:else}
  		<p style='text-align: center'>No hay Resultados</p>
   {/if}
  </div>
<style>
  .row{
    color: #61BAFF;
    font-family: 'Source code pro';
    display: flex;
    border: 1px solid #61BAFF;
    margin:30px 0 0;
    padding:0 30px;
  }
  .row p:last-child{
    flex-grow: 1;
    text-align: right;
  }
  .controls{
  	display: flex;
  	flex-direction: column;
  	margin:6px 0 0 9px;
  }
  button{
  	color:black;
  	border:none;
  	background-color:#61BAFF;
  	border-radius: 0;
  	padding:2px;
  	margin:1px 0 0 0;
  	font-size:11px;
  }
  button:hover{
  	background-color:#8cf;
  }
</style>