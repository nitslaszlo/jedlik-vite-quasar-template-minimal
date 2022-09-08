<script setup lang="ts">
  const times = ref<number>(2);
  const props = defineProps<{ count: number }>();
  const result = computed(() => props.count * times.value);
  defineExpose(props);
</script>

<template>
  <h1>{{ count }} x {{ times }} = {{ result }}</h1>
  <button id="plusBtn" @click="times += 1">plus</button>
  <button id="minusBtn" @click="times -= 1">minus</button>
</template>
