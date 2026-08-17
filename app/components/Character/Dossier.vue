<template>
  <section class="flex flex-col md:flex-row gap-6">
    <div
      class="flex-2 h-fit bg-base-200 px-6 py-5 border border-white/25 rounded-lg"
    >
      <div class="flex items-center gap-3 mb-4">
        <div class="h-9 w-1 rounded-full bg-primary"></div>
        <h2>Dossier</h2>
      </div>

      <div class="divide-y divide-white/10">
        <div class="flex justify-between items-center text-2xl py-3">
          <p class="opacity-60">Constellation</p>
          <p>{{ character.constellation }}</p>
        </div>
        <div class="flex justify-between items-center text-2xl py-3">
          <p class="opacity-60">Weapon</p>
          <p>{{ character.weapon_type_id.name }}</p>
        </div>
        <div class="flex justify-between items-center text-2xl py-3">
          <p class="opacity-60">Vision</p>
          <p>{{ character.vision_id.name }}</p>
        </div>
        <div class="flex justify-between items-center text-2xl py-3">
          <p class="opacity-60">Birthday</p>
          <p>{{ character.birthday }}</p>
        </div>
      </div>
    </div>

    <div class="flex-1">
      <figure
        class="bg-base-200 min-h-100 h-full flex justify-center items-center rounded-lg border border-white/25 overflow-hidden"
      >
        <img
          class="w-full h-full object-cover"
          :src="character.splash_art_url"
          alt=""
        />
      </figure>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  character: {
    type: Object,
    default: () => ({}),
  },
});
</script>
