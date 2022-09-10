<script setup lang="ts">
  const lorem =
    "Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.";
</script>

<template>
  <q-page>
    <div class="row">
      <div v-for="n in 12" :key="n" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <q-card
          class="my-card text-white q-ma-xs"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">Actual breakpoint: {{ $q.screen.name }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ lorem.slice(0, n * 23) }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
</style>
