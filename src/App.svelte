<script>
  import { Router, Link, Route } from "svelte-routing";
  import Inicio from "./containers/index.svelte";
  import Invoice from "./containers/invoice.svelte";
  import Header from "./components/header.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <nav>
    <Link to="/">Inicio</Link>
    <Link to="/invoice">Invoice test</Link>
  </nav>
  <Header />
  <Route path="/invoice" component={Invoice} />
  <Route path="/">
    <Inicio />
  </Route>
</Router>

<style>
  nav {
    display: none;
  }
</style>