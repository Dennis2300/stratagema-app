<template>
  <section
    class="flex-2 h-fit rounded-lg border border-base-content/50 bg-base-200 px-6 py-5 shadow-lg"
  >
    <div class="mb-5 flex items-center gap-3">
      <div class="h-9 w-1 rounded-full bg-primary"></div>
      <h2 class="font-bold tracking-wide">Best Weapons</h2>
    </div>

    <div class="space-y-4">
      <div
        v-for="weapon in weaponsByRank"
        :key="weapon.id"
        class="bg-base-100 rounded-xl border border-white/25"
      >
        <NuxtLink
          class="flex justify-between items-center p-3 rounded-t-xl group hover:bg-base-300 hover:cursor-pointer transition-all duration-300"
        >
          <figure class="flex items-center gap-3">
            <img
              class="h-16 w-16 mask mask-squircle"
              :class="{
                'rarity-5': weapon.weapon_id.rarity === 5,
                'rarity-4': weapon.weapon_id.rarity === 4,
                'rarity-3': weapon.weapon_id.rarity === 3,
              }"
              :src="weapon.weapon_id.img_url"
              :alt="weapon.weapon_id.name"
            />
            <figcaption class="space-y-1">
              <h3 class="text-white/90 truncate max-w-64 md:max-w-lg">
                {{ weapon.weapon_id.name }}
              </h3>
              <div class="flex items-center gap-4 text-xs">
                <div class="space-x-1">
                  <span class="text-base-content/55">STAT:</span>
                  <span class="text-base-content">{{
                    weapon.weapon_id.stat
                  }}</span>
                </div>
                <div class="space-x-1">
                  <span class="text-base-content/55">VALUE:</span>
                  <span class="text-base-content">{{
                    weapon.weapon_id.stat_value
                  }}</span>
                </div>
              </div>
            </figcaption>
          </figure>
          <div
            class="hidden pr-4 transition-all duration-200 group-hover:translate-x-2 group-hover:text-primary sm:block"
          >
            →
          </div>
        </NuxtLink>
        <div class="h-px bg-white/25 rounded-full"></div>
        <p class="text-base-content text-sm p-4">{{ weapon.details }}</p>
      </div>
    </div>

    <div
      v-if="weapons.length === 0"
      class="rounded-lg border border-dashed border-base-300 bg-base-100 px-4 py-8 text-center"
    >
      <p class="text-sm text-base-content/50">No recommended weapons found.</p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  weapons: {
    type: Array,
    default: () => [],
  },
});

const weaponsByRank = computed(() => {
  return [...props.weapons].sort((a, b) => a.rank - b.rank);
});
</script>
