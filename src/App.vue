<script setup lang="ts">
  import router from "src/router";
  import { useUsersStore } from "./store/usersStore";

  const leftDrawer = ref<boolean>(true);
  const usersStore = useUsersStore();

  const menuItems = ref([
    {
      icon: "mdi-home",
      text: "startPage",
      name: "startPage",
      route: "/",
      disabled: false,
      separator: false,
    },
    {
      icon: "mdi-soccer",
      text: "examples",
      name: "examples",
      route: "/examples",
      disabled: false,
      separator: false,
    },
    {
      icon: "mdi-grid",
      text: "gridDemo",
      name: "gridDemo",
      route: "/grid",
      disabled: false,
      separator: false,
    },
    {
      icon: "mdi-account",
      text: "account",
      name: "account",
      route: "/account",
      disabled: false,
      separator: false,
    },
    {
      icon: "mdi-information",
      text: "about",
      name: "about",
      route: "/about",
      disabled: false,
      separator: false,
    },
    {
      icon: "mdi-lifebuoy",
      text: "help",
      name: "help",
      route: "/help",
      disabled: false,
      separator: true,
    },
  ]);

  const links = ref([
    {
      icon: "mdi-github",
      text: "GitHub repo",
      name: "",
      link: "https://github.com/nitslaszlo/jedlik-vite-quasar-template-minimal",
      disabled: false,
      separator: false,
    },
    {
      icon: "mdi-tire",
      text: "Quasar",
      name: "",
      link: "https://quasar.dev/",
      disabled: false,
      separator: false,
    },
    {
      icon: "mdi-fruit-pineapple",
      text: "Pinia",
      name: "",
      link: "https://pinia.vuejs.org/introduction.html",
      disabled: false,
      separator: false,
    },
  ]);
</script>

<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr fFf">
      <q-header class="bg-primary text-white text-left" elevated>
        <q-toolbar>
          <q-btn dense flat icon="mdi-menu" round @click="leftDrawer = !leftDrawer" />
          <q-toolbar-title id="title" style="cursor: pointer" @click="router.push({ path: '/' })">
            <q-avatar>
              <img src="./assets/Jedlik_small.png" />
            </q-avatar>
            Jedlik Vite-Quasar minimal template 2022 -
            {{ usersStore.loggedUser ? usersStore.loggedUser?.name : "You arn't logged in." }}
          </q-toolbar-title>
          <q-btn flat icon="mdi-theme-light-dark" @click="$q.dark.toggle" />
          <q-btn dense flat icon="mdi-menu" round @click="leftDrawer = !leftDrawer" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawer"
        bordered
        :breakpoint="500"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        show-if-above
        :width="200"
      >
        <q-scroll-area class="fit">
          <!-- routes: -->
          <q-list>
            <template v-for="(menuItem, index) in menuItems" :key="index">
              <q-item clickable :disable="menuItem.disabled" :to="menuItem.route">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.text }}
                </q-item-section>
              </q-item>
              <q-separator v-if="menuItem.separator" :key="'sep' + index" />
            </template>
            <q-item clickable :disable="usersStore.loggedUser == null" to="/qtable">
              <q-item-section avatar>
                <q-icon name="mdi-table" />
              </q-item-section>
              <q-item-section>q-table</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
          <!-- links: -->
          <q-list>
            <template v-for="(linkItem, index) in links" :key="index">
              <q-item clickable :href="linkItem.link">
                <q-item-section avatar>
                  <q-icon :name="linkItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ linkItem.text }}
                </q-item-section>
              </q-item>
              <q-separator v-if="linkItem.separator" :key="'sep' + index" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container id="container">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="slide-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
  .slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s ease;
  }

  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }

  #title {
    font-size: 10px;
    @media (min-width: 400px) {
      font-size: calc(10px + 0.5vw);
    }
    @media (min-width: 800px) {
      font-size: calc(14px + 0.5vw);
    }
    @media (min-width: 1200px) {
      font-size: calc(18px + 0.5vw);
    }
  }
</style>
