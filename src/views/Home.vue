<template>
  <div class="home">
    <ListaVideojuegos>
      
    </ListaVideojuegos>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ListaVideojuegos from "../views/ListaVideojuegos.vue";
export default {
  name: "Home",
  components: {
    ListaVideojuegos
  },
};
</script>
