<script>
  import { Router, link } from "svelte-routing";
  import formatNumber from "../helpers/FormatNumber.js";
  export let totalsByEntity = [];
  export let currency = 'MXN';
  console.log(totalsByEntity);
</script>

<div class='rows'>
  {#each totalsByEntity as item }
    <div class='item'>
      <h4>{item.entity.nombre}</h4>
      <p><strong>Numero de facturas:</strong> {item.count}</p>
      <p><strong>Monto total:</strong> {formatNumber(item.total,currency)}</p>
    </div>
  {/each}
</div>

<style>
  .rows {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .item {
    flex: 1 0 45%;
    max-width: 45%;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0px 0px 9px -5px #000;
    background-color: #fff;
    margin: 10px 0;
    color: #000;
  }

  .item p {
    margin: 0;
  }

  .item h4 {
    margin: 0 0 15px 0;
    color: #28bee6;
  }

  @media (max-width: 800px) {
    .item {
      flex: 1;
      min-width: 100%;
    }
  }
</style>