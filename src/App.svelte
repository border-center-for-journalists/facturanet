<script>
  import { Router, Link, Route } from "svelte-routing";
  import Inicio from "./containers/index.svelte";
  import Entity from "./containers/entity.svelte";
  import Invoice from "./containers/invoice.svelte";
  import Header from "./components/header.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <nav>
    <Link to="/">Inicio</Link>
  </nav>
  <Header />
  <Route path="/entity/:id" component="{Entity}" />
  <Route path="/">
    <Inicio />
  </Route>
</Router>

<style>
  nav {
    display: none;
  }
</style>