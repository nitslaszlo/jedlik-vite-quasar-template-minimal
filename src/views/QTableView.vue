<script setup lang="ts">
  import { usePostsStore } from "../store/postsStore";

  const postsStore = usePostsStore();
  // Selected row(s) -> selection="single" or selection="multiple"
  const selected = ref<any>([]);

  function deleteRecord(): void {
    postsStore.deletePostById({ _id: selected.value[0]._id });
    // postsStore.posts = postsStore.posts.filter((i) => i._id !== selected.value[0]._id);

    selected.value = [];
  }

  const columns: any[] = [
    { name: "title", label: "Title", field: "title", align: "left", sortable: true },
    { name: "content", label: "Content", field: "content", align: "left", sortable: true },
  ];

  const pagination = ref({
    sortBy: "title",
    descending: false,
    page: 1,
    rowsPerPage: 5,
    rowsNumber: postsStore.numberOfPosts,
    filter: "",
  });

  const filter = ref("");

  watch(postsStore, () => {
    pagination.value.rowsNumber = postsStore.numberOfPosts;
  });

  function onRequest(props: any) {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;

    postsStore.fetchPaginatedPosts({
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      order: sortBy,
      sort: descending ? "-1" : "1",
      keyword: filter.value,
    });

    // don't forget to update local pagination object
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
  }

  onMounted(() => {
    onRequest({
      pagination: pagination.value,
    });
  });
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        v-model:pagination="pagination"
        v-model:selected="selected"
        binary-state-sort
        :columns="columns"
        dense
        :filter="filter"
        row-key="_id"
        :rows="postsStore.posts"
        selection="single"
        title="Posts"
        wrap-cells
        @request="onRequest"
      >
        <template #top-right>
          <q-input v-model="filter" debounce="300" dense placeholder="Search">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <!-- slot1: -->
        <!-- <template #body-cell-boolField="props">
          <q-td :props="props">
            <q-badge v-if="props.value" color="green" label="Yes" outline />
            <q-badge v-else color="red" label="No" outline />
          </q-td>
        </template> -->
        <!-- slot2: -->
        <!-- <template #body-cell-imgField="props">
          <q-td :props="props">
            <img :src="props.value" style="max-height: 100px" />
          </q-td>
        </template> -->
      </q-table>
      <!-- Button for delete selected record: -->
      <div class="row justify-center q-ma-md">
        <q-btn
          v-show="selected.length != 0"
          color="red"
          label="Delete selected record"
          no-caps
          @click="deleteRecord"
        />
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
