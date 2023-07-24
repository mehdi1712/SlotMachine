<script setup lang="ts">
import { RouterView } from "vue-router";
import { nextTick } from "vue";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from "flowbite";
import Header from "@/components/partials/Header.vue";

// initialize components based on data attribute selectors
onMounted(() => {
  nextTick(() => {
    initFlowbite();
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
  });
});
</script>

<template>
  <div class="w-full">
    <Header />
    <div class="main-root py-10 px-5 w-full min-h-[100vh]">
      <RouterView />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
