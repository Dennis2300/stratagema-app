<template>
  <section class="flex flex-col md:flex-row">
    <figure class="flex flex-col md:flex-row flex-2 items-center gap-4">
      <img
        class="w-32 h-32 rounded-2xl"
        :class="{
          'rarity-5': character.rarity === 5,
          'rarity-4': character.rarity === 4,
        }"
        :src="character.img_url"
        alt=""
      />
      <figcaption class="text-center md:text-start">
        <h1>{{ character.name }}</h1>
        <div class="leading-none text-yellow-600">
          <span v-for="n in character.rarity">★</span>
        </div>
        <div class="flex items-center gap-2 my-2">
          <span
            class="bg-zinc-700 px-2.5 py-1.5 text-xs border border-white/25 rounded-lg"
            >{{ character.vision_id.name }}</span
          >
          <span
            class="bg-zinc-700 px-2.5 py-1.5 text-xs border border-white/25 rounded-lg"
            >{{ character.weapon_type_id.name }}</span
          >
          <span
            class="bg-zinc-700 px-2.5 py-1.5 text-xs border border-white/25 rounded-lg"
            >{{ character.role }}</span
          >
          <span
            class="bg-zinc-700 px-2.5 py-1.5 text-xs border border-white/25 rounded-lg"
            >{{ character.main_stat }}</span
          >
        </div>
      </figcaption>
    </figure>
    <div class="flex-1 flex flex-col justify-center">
      <div class="flex items-center gap-3">
        <div class="h-9 w-1 rounded-full bg-primary"></div>
        <h2>Voice Actor's</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <p>Placeholder</p>
        <p>Placeholder</p>
        <p>Placeholder</p>
        <p>Placeholder</p>
      </div>
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
