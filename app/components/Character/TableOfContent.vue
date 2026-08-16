<template>
  <section class="hidden md:block fixed left-12 top-1/2 -translate-y-1/2 w-48">
    <h4>Contents</h4>

    <nav class="flex flex-col">
      <div @click="scrollToTop()" class="cursor-pointer">Dossier</div>
      <a href="#weapons"> Weapons </a>
      <a href="#artifacts"> Artifacts </a>
      <a href="#builds"> Builds </a>
      <a href="#team-comps"> Team Comps </a>
      <a href="#materials"> Materials </a>
    </nav>
  </section>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>
