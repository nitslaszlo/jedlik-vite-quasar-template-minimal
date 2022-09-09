<script setup lang="ts">
  import { useMouse, useCounter } from "@vueuse/core";
  const { x, y } = useMouse();
  const { count, inc, dec } = useCounter();
</script>

<template>
  <div id="app">
    <q-chip class="bg-red">Add to calendar</q-chip>
    <h3>Mouse: {{ x }} x {{ y }}</h3>
    <h3>
      Counter: {{ count }}
      <a style="margin-right: 10px" @click="inc()">+</a>
      <a @click="dec()">-</a>
    </h3>

    <br />
  </div>
</template>

<style scoped>
  h1,
  h2,
  h3,
  p {
    font-family: "Noto Serif", serif;
    user-select: none;
  }
  #app {
    text-align: center;
    color: rgba(0, 0, 0, 0.4);
  }
  a {
    color: #41b883;
    text-decoration: none;
    cursor: pointer;
  }
</style>
