<template>
  <section class="hidden md:block fixed left-6 top-1/3 -translate-y-1/2 w-48">
    <h4>Contents</h4>

    <nav class="flex flex-col">
      <div @click="scrollToTop()" class="cursor-pointer">Dossier</div>
      <a href="#weapons"> Best Weapons </a>
      <a href="#"> Best Artifacts </a>
      <a href="#"> Builds </a>
      <a href="#"> Team Comps </a>
      <a href="#"> Materials </a>
    </nav>
  </section>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>
