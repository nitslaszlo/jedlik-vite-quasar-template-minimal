<script setup lang="ts">
  let counter1 = ref(123);
  let state = reactive({
    counter2: 0,
  });

  const titleClass = ref("titleRed");

  function inc(): void {
    counter1.value++;
    state.counter2++;
    if (state.counter2 % 2 == 0) {
      titleClass.value = "titleRed";
    } else {
      titleClass.value = "titleBlue";
    }
  }
</script>

<template>
  <q-page>
    <q-btn color="white" label="Increment" no-caps text-color="black" @click="inc()" />
    <h1>{{ counter1 }}</h1>
    <h1>{{ state.counter2 }}</h1>
    <h1 :class="titleClass">Make me red</h1>
  </q-page>
</template>

<style>
  .titleRed {
    color: red;
  }
  .titleBlue {
    color: blue;
  }
</style>
